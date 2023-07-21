let sectionActive = "#banner";

const classActiveHeader = "header-active";

window.onload = function () {
  // BUTTON MENU
  const btnMenu = document.getElementById("btn-menu");
  btnMenu.addEventListener("click", toggleMenu);

  // LINKS HEADER
  const headerLinks = document.querySelectorAll(".header li a");
  headerLinks.forEach(link => {
    link.addEventListener("click", redirectInternal);
  });

  // Activate the menu link that is in the sectionActive variable
  activeLink();
}

window.onscroll = function () {
  // Check which blocks you are on top of and change the sectionActive variable
  const sections = document.querySelectorAll("section");
  const header = document.getElementById("header");

  sections.forEach(section => {
    if (
      window.scrollY > (section.offsetTop - header.clientHeight) && 
      window.scrollY <= ((section.offsetTop + section.clientHeight) - header.clientHeight)
    ) {
      if (section.id && sectionActive !== `#${section.id}`) {
        sectionActive = `#${section.id}`;

        activeLink();
      }
    }
  });
}

// Activate the menu link that is in the sectionActive variable
function activeLink() {
  const headerLinks = document.querySelectorAll(".header li a");
  headerLinks.forEach(link => 
    link.getAttribute("href") === sectionActive ? link.classList.add("active-link") : link.classList.remove("active-link"));
}

// Makes an internal redirection through the menu links
function redirectInternal(event) {
  event.preventDefault();

  const id = this.getAttribute("href");
  const header = document.getElementById("header");
  const element = document.querySelector(id);
  
  if (element) {
    smoothScrollTo(0, element.offsetTop - header.clientHeight + 1, 800);
    header.classList.remove(classActiveHeader);
  }
}

// Opens and closes the menu
function toggleMenu() {
  const header = document.getElementById("header");
  if (header.classList.contains(classActiveHeader)) {
    header.classList.remove(classActiveHeader);
  } else {
    header.classList.add(classActiveHeader);
  }
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};