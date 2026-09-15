const loadJson = async (path) => {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Unable to load ${path}`);
    return response.json();
};

const createElement = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
};

const createTags = (items = []) => {
    const list = createElement("div", "tag-list");
    items.forEach((item) => list.append(createElement("span", "tag", item)));
    return list;
};

const renderResume = (resume) => {
    document.getElementById("hero-summary").textContent = resume.headline;
    document.getElementById("email-link").href = `mailto:${resume.email}`;
    document.getElementById("email-link").textContent = resume.email;
    document.getElementById("linkedin-link").href = resume.linkedinurl;
    document.getElementById("github-link").href = resume.githuburl;

    const skillGrid = document.getElementById("skill-grid");
    resume.skillgroups.forEach((group) => {
        const card = createElement("article", "skill-card");
        card.append(createElement("h3", "", group.title), createTags(group.skills));
        skillGrid.append(card);
    });

    const experienceList = document.getElementById("experience-list");
    resume.professional.forEach((job) => {
        const item = createElement("article", "experience-item");
        item.append(createElement("div", "experience-date", `${job.start} — ${job.end}`));
        const details = createElement("div", "experience-details");
        details.append(createElement("h3", "", job.company));
        details.append(createElement("p", "experience-role", `${job.position} · ${job.location}`));
        const responsibilities = createElement("ul");
        job.responsibilities.forEach((responsibility) => responsibilities.append(createElement("li", "", responsibility)));
        details.append(responsibilities);
        item.append(details);
        experienceList.append(item);
    });

    const educationList = document.getElementById("education-list");
    resume.academic.forEach((education) => {
        const card = createElement("article", "education-card");
        card.append(createElement("time", "", education.graduation_date));
        card.append(createElement("h3", "", education.institution));
        card.append(createElement("p", "", education.title));
        educationList.append(card);
    });
};

const createProjectCard = (project) => {
    const card = createElement("article", "project-card");
    if (project.display_image) {
        const image = createElement("img", "project-image");
        image.src = project.display_image;
        image.alt = `${project.title} project preview`;
        image.loading = "lazy";
        card.append(image);
    } else {
        card.append(createElement("div", "project-image-placeholder", "</>"));
    }

    const content = createElement("div", "project-content");
    content.append(createElement("p", "project-category", project.category));
    content.append(createElement("h3", "", project.title));
    content.append(createElement("p", "", project.description));
    content.append(createTags(project.technologies));

    if (project.links.length) {
        const links = createElement("div", "project-links");
        project.links.forEach((link) => {
            const anchor = createElement("a", "", `${link.name} ↗`);
            anchor.href = link.url;
            anchor.target = "_blank";
            anchor.rel = "noreferrer";
            links.append(anchor);
        });
        content.append(links);
    }

    card.append(content);
    return card;
};

const renderProjects = (projects) => {
    const featured = document.getElementById("featured-projects");
    const additional = document.getElementById("additional-projects");
    projects.forEach((project) => (project.featured ? featured : additional).append(createProjectCard(project)));
};

const renderCertifications = (certifications) => {
    const container = document.getElementById("certs-container");
    certifications.forEach((certification) => {
        const card = createElement("article", "certificate-card");
        const image = createElement("img");
        image.src = certification.image;
        image.alt = certification.title;
        image.loading = "lazy";
        const copy = createElement("div");
        copy.append(createElement("h4", "", certification.title));
        copy.append(createElement("p", "", certification.issued || certification.issues || ""));
        card.append(image, copy);
        container.append(card);
    });
};

const renderRecognition = (items, containerId, titleKey, descriptionKey) => {
    const container = document.getElementById(containerId);
    items.forEach((item) => {
        const entry = createElement("article", "recognition-item");
        entry.append(createElement("h4", "", item[titleKey]));
        entry.append(createElement("p", "", item[descriptionKey] || ""));
        container.append(entry);
    });
};

const initialize = async () => {
    try {
        const [resume, projects, certifications, awards, involvement] = await Promise.all([
            loadJson("data/resume.json"),
            loadJson("data/projects.json"),
            loadJson("data/certs.json"),
            loadJson("data/awards.json"),
            loadJson("data/involvement.json")
        ]);

        renderResume(resume);
        renderProjects(projects);
        renderCertifications(certifications);
        renderRecognition(awards, "awards-list", "title", "organization");
        renderRecognition(involvement, "involvement-list", "title", "description");
        document.getElementById("current-year").textContent = new Date().getFullYear();
    } catch (error) {
        console.error(error);
    }
};

initialize();
