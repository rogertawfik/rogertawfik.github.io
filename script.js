const tabs = [...document.querySelectorAll(".project-tab")];
const projects = [...document.querySelectorAll(".project")];

function selectProject(name) {
  tabs.forEach((tab) => {
    const active = tab.dataset.project === name;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });

  projects.forEach((project) => {
    const active = project.id === name;
    project.classList.toggle("is-active", active);
    project.hidden = !active;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectProject(tab.dataset.project));
  tab.addEventListener("keydown", (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    selectProject(next.dataset.project);
    next.focus();
  });
});

const motionButton = document.querySelector("#motion-button");
const trainerStage = document.querySelector(".trainer-stage");
const motionLabel = document.querySelector("#motion-label");

motionButton.addEventListener("click", () => {
  const paused = trainerStage.classList.toggle("is-paused");
  motionButton.textContent = paused ? "Resume movement" : "Pause movement";
  motionLabel.textContent = paused ? "Paused" : "Tracking";
});
