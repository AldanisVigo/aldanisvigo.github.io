/*
    Function to fetch and build the projects section
*/
const buildProjectsSection = async () => {
    try {
        let data = await fetch('data/projects.json')
        const projects = await data.json()
        projects.forEach((project,index)=>{
            //Generate an element for the project title
            const projectName = document.createElement('div')
            //Set the text to the project title
            $(projectName).text(`Project #${index+1} - ${project.title}`)
            //Add some classes for bootstrap styling
            $(projectName).addClass('mt-5').addClass('h5')
            $('#projects').append(projectName)

            //Generate the project image element
            const projectImage = document.createElement('img')
            //Set the src of the project image to the project's image
            $(projectImage).attr('src',project.display_image)
            //Add some classes for bootstrap styling
            $(projectImage).addClass('img').addClass('img-thumbnail')

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
            $('#projects').append(projectDescription)

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

    }catch(err){
        console.error(err)
    }
}