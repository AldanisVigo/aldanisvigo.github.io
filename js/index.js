/*
    Function to fetch and build the projects section
*/
const buildProjectsSection = async () => {
    try {
        let src = window.location.hostname === 'localhost' ? 'data/projects.json' : 'https://aldanisvigo.github.io/data/projects.json'
        let data = await fetch(src)
        const projects = await data.json()
        projects.forEach((project,index)=>{
            //Generate an element for the project title
            const projectName = document.createElement('div')
            $(projectName).attr('data-aos','fade-down')
            //Set the text to the project title
            $(projectName).text(`Project #${index+1} - ${project.title}`)
            $(projectName).attr('id',`project_${index}`)
            //Add some classes for bootstrap styling
            $(projectName).addClass('mt-5').addClass('h5')
            $('#projects').append(projectName)

            //Generate the project image element
            const projectImage = document.createElement('img')
            //Set the src of the project image to the project's image
            $(projectImage).attr('src',project.display_image)
            //Add some classes for bootstrap styling
            $(projectImage).addClass('img').addClass('img-thumbnail').attr('data-aos','flip-left')

            //Generate the container for the projectImage
            const projectImageContainer = document.createElement('div')
            //Add bootstrap classes for styling
            $(projectImageContainer).addClass('text-center')
            //Add the projectImage to the container
            $(projectImageContainer).append(projectImage)
            //Add the project image container to the projects container
            $('#projects').append(projectImageContainer)

            //Generate the project description element
            const projectDescription = document.createElement('div')
            //Populate the description element with the project description
            $(projectDescription).text(project.description)
            //Add the project description element to the projects container
            $('#projects').append(projectDescription).attr('data-aos','flip-right')

            //Generate the project links list
            const projectLinks = document.createElement('ul')
            $(projectLinks).css({
                marginTop : 20
            })
            project.links.forEach(link=>{
                let l = document.createElement('li')
                $(l).text(link.name).css({
                    textDecoration : 'underline'
                }).click(e=>{
                    window.open(link.url,'_blank')
                }).hover(function (){
                    $(this).css({
                        cursor : 'pointer'
                    })
                }, function () {
                    $(this).css({
                        cursor : 'normal'
                    })
                })

                $(projectLinks).append(l)
            })
            //Add the list of project links to the projects container
            $('#projects').append(projectLinks)

        })
    }catch(err){
        console.error(err)
    }
}

buildProjectsSection()


/*
    Function fetches and builds the certs section
 */
const buildCertsSection = async () => {
    try{
        let src = window.location.hostname === 'localhost' ? 'data/certs.json' : 'https://aldanisvigo.github.io/data/certs.json'
        let data = await fetch(src)
        const certs = await data.json()
        certs.forEach(cert=>{
            //Generate a container for the cert image
            const certContainer = document.createElement('div')
            //Add classes for bootstrap styling
            $(certContainer).addClass('col-6 col-md-4 col-lg-3 mt-3').attr('data-aos','flip-left')

            //Generate the certificate image element
            const certImage = document.createElement('img')
            //Set the src attribute of the cert image
            $(certImage).attr('src',cert.image)
            //Add classes for bootstrap styling
            $(certImage).addClass('img').addClass('img-thumbnail').addClass('h-100')

            //Add the image to the cert container
            $(certContainer).append(certImage)

            //Add the cert to the certs section
            $('#certs_container').append(certContainer)
        })
    }catch(err){
        console.error(err)
    }
}

buildCertsSection()


/*
    Function to fill in the resume
 */
const fillInResume = async () => {
    try {
        let src = window.location.hostname === 'localhost' ? 'data/resume.json' : 'https://aldanisvigo.github.io/data/resume.json'
        const data = await fetch(src)
        const resume = await data.json()

        //Fill in the title
        $('#resume_title').text(resume.title)

        //Fill in the position
        $('#resume_position').text(resume.position)

        //Fill in the headline
        $('#resume_headline').text(resume.headline)

        //Fill in the phone number
        $('#resume_phone').text(resume.phone)

        //Fill in the email
        $('#resume_email').text(resume.email)

        //Fill in the linkedin handle
        $('#resume_linkedin').html(`<a href=${resume.linkedinurl} target='_blank'>@${resume.linkedin}</a>`)

        //Fill in the github handle
        $('#resume_github').html(`<a href=${resume.githuburl} target='_blank'>@${resume.github}</a>`)

        //Fill in the skills and abilities list
        resume.skillsandabilities.forEach(item=>{
            $('#resume_skills_and_abilities').append(`<li>${item}</li>`)
        })

        //Fill in the academics section
        resume.academic.forEach(item=>{

            $('#resume_academic').append(`<h5>${item.institution}</h5>`)
            $('#resume_academic').append(`<h6>${item.title}</h6>`)
            $('#resume_academic').append(`${item.graduated ? 'Graduated:' + item.graduation_date : 'Currently Attending'}`)
            $('#resume_academic').append('<hr/>')
        })

        //Fill in the resume professional experience section
        resume.professional.forEach((item,index)=>{
            let responsibilitiesList = document.createElement('ul')
            item.responsibilities.forEach(responsibility=>{
                $(responsibilitiesList).append(`<li>${responsibility}</li>`)
            })

            let achievementsList = document.createElement('ul')
            item.achievements.forEach((achievement,index)=>{
                $(achievementsList).append(`<li>${achievement}</li>`)
            })

            $('#resume_professional_experience').append(`
                <div class='row mt-3'>
                    <h5>${item.company} - ${item.start} - ${item.end}</h5>
                    <em>${item.position}</em>
                    <strong>Responsibilities:</strong>
                    ${$(responsibilitiesList).html()}
                    <strong>Achievements:</strong>
                    ${$(achievementsList).html()}
                </div>
            `)
        })

        //Get the projects data from the projects.json file
        let projects_json = await fetch('data/projects.json')
        let projects_data = await projects_json.json()

        //Iterate through the projects
        projects_data.forEach((project,index)=>{ //For each project
            //Create a row element
            let projectElement = document.createElement('div')

            //Add the bootstrap classes to the projectElement
            $(projectElement).addClass('row')

            //Create the job listing
            //Add a title
            let jobTitle = document.createElement('h4')
            $(jobTitle).text(project.title)

            //When user clicks on
            $(jobTitle).click(()=>{
                let id = "#project_" + Number(index)
                window.location.href = id
            })

            $(projectElement).append(jobTitle)
            let projectLinks =  '<div>'
            project.links.forEach(link=>{
                if(link.name == 'GitHub'){
                    console.log("Hit a github link")
                    //If this is a github link
                    projectLinks += `<a href='${link.url}' target="_blank" class="me-2 resume_icon_link"><i class="bi bi-github"></i></a>`
                }else{
                    //Has to be a demo link
                    projectLinks += `<a href='${link.url}' target="_blank" class="me-2 resume_icon_link"><i class="bi bi-eye"></i></i></a>`
                }
            })
            //Add the project links to the project element
            $(projectElement).append(projectLinks)

            //Add a click event to scroll to the project section on the page
            $(projectElement).click((e)=>{
                // e.stopPropagation()
            }).hover(()=>{ //add some hover effects
                $(projectElement).css({
                    cursor: 'pointer',
                    background: 'lightblue'
                })
            },()=>{
                $(projectElement).css({
                    cursor : 'normal',
                    background: 'inherit'
                })
            })

            //Add the current project to the list of projects
            $("#resume_projects").append(projectElement)
        })

        //Add the list of awards to the page
        const awards_data = await fetch('data/awards.json')
        //Pull the json array
        const awards_json = await awards_data.json()
        console.log(awards_json)
        //Iterate through each award
        awards_json.forEach(award=>{ //for each award
            //Create an award element
            let awardElement = document.createElement('div')

            //Add the organization to the award
            let org = document.createElement('h4')
            $(org).text(award.organization)

            //Add the title to the award
            let title = document.createElement('h6')
            $(title).text(award.title)

            //Add the description to the award
            let desc = document.createElement('div')
            $(desc).text(award.description)

            //Put it all together
            $(awardElement).append(org).append(title).append(desc)
            $('#resume_awards').append(awardElement)
        })

        //Add the list of involvements to the resume
        const involvement_data = await fetch('data/involvement.json')
        const involvement_json = await involvement_data.json()

        //Iterate through all the involvement items
        involvement_json.forEach(involvement => {
            //Create an involvement element
            let involvementElement = document.createElement('div')

            //Add the title
            let title = document.createElement('h4')
            $(title).text(involvement.title)

            //Add the description
            let description = document.createElement('div')
            $(description).text(involvement.description)

            //Put it all together
            $(involvementElement).append(title).append(description)

            //Add the involvement element to the page
            $('#resume_involvement').append(involvementElement)
        })

    }catch(err){
        console.error(err)
    }
}

fillInResume()