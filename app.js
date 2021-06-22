const burger = document.querySelector(".burger");
const nav = document.querySelector(".navigation");
const navLinks = document.querySelectorAll(".navigation li");
const projectGrid = document.querySelector("#project-grid");
// script for responsive navbar

// this function uses transititon to smoothly animate the nav links when the burger is clicked by the user
function animateLinks(navLinks) {
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });
}
// this function helps to close the nav when the user clicks on any nav link
function toggleNavFromLink(navLinks) {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      // animate Links
      animateLinks(navLinks);
      burger.classList.toggle("toggle");
    });
  });
}
const navSlide = () => {
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    animateLinks(navLinks);
    burger.classList.toggle("toggle");
  });
  toggleNavFromLink(navLinks);
};
navSlide();

// fetch data from projects json file
async function getProjects(url) {
  try {
    let response = await fetch(url);
    let projects = await response.json();
    console.log(projects);

    let projectDetails = projects.map(project =>{
      let { projectTitle, projectLink,projectImg} = project;
      return {projectImg,projectLink,projectTitle};
    })
    return projectDetails;

  } catch (error) {
    console.log(error)
  }
}
const displayProjects = (arr)=>{
  let projectString = "";
  arr.forEach(project =>{
    projectString +=
     `
           <div class="project-tile">
            <a href="${project.projectLink}" target="_blank">
              <img class="project-image" src="${project.projectImg}" alt="image of a project" class="project-image">
              <div class="project-title-container">
                <p class="project-title">
                  <span class="code"><</span>
                  ${project.projectTitle}
                  <span class="code">/></span>
                </p>
              </div>
            </a>
          </div>
    `;
  })
  projectGrid.innerHTML = projectString;
}
document.addEventListener("DOMContentLoaded", () => {
  getProjects("projects.json").then(projects =>{
    displayProjects(projects)
  })
});
