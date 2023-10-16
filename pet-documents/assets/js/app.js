window.onload = function() {
  startHeader();
  startServices();
  startPhases();

  window.onscroll = scrollApp;
}

function scrollApp() {
  bgHeader();
  headerLinkActive();
}

// HEADER START
const headerActiveClass = "active-header";
const headerLinkActiveClass = "active-link";

let activeHeaderLink = "";

function startHeader() {
  const header = document.querySelector("header.header");
  const headerButton = document.querySelector("button#toggle-header");
  const headerLink = document.querySelectorAll("div.header-nav nav ul li a");

  headerButton.addEventListener("click", () => toggleHeader(header));
  headerLink.forEach(el => el.addEventListener("click", event => goSection(event, header)));

  headerLinkActive();
}

function toggleHeader(header) {
  if (window.screen.width <= 768) {
    if (header.classList.contains(headerActiveClass)) {
      header.classList.remove(headerActiveClass);
    } else {
      header.classList.add(headerActiveClass);
    }
  }
}

function bgHeader() {
  const header = document.querySelector("header.header");
  const banner = document.querySelector("section#banner");

  const limit = banner.clientHeight;
  if (window.scrollY > limit && !header.classList.contains("bg-header")) {
    header.classList.add("bg-header");
  } else if (window.scrollY <= limit && header.classList.contains("bg-header")) {
    header.classList.remove("bg-header");
  }
}

function goSection(event, header) {
  event.preventDefault();
  const attr = event.target.getAttribute("href");
  const section = document.querySelector(`section${attr}`);

  if (section) {
    smoothScrollTo(0, section.offsetTop, 800);
    header.classList.remove(headerActiveClass);
  }
}

function headerLinkActive() {
  const sections = document.querySelectorAll("section");

  sections.forEach(el => {
    const posYStart = el.offsetTop;
    const posYEnd = posYStart + el.clientHeight;

    if (
      window.scrollY > posYStart && 
      window.scrollY <= posYEnd && 
      activeHeaderLink !== el.getAttribute("id")
    ) {
      const headerLink = document.querySelector(`div.header-nav nav ul li a[href="#${el.getAttribute("id")}"]`);
      
      if (headerLink) {
        activeHeaderLink = el.getAttribute("id");
        document.querySelectorAll("div.header-nav nav ul li a")
          .forEach(el => el.classList.remove(headerLinkActiveClass));
        headerLink.classList.add(headerLinkActiveClass);
      }
    }
  });
}
// HEADER END

// SERVICES START
const servicesData = {
  rg: {
    title: "RG Identifica",
    benefits: [
      "Agiliza o cadastro em clinicas veterinárias.",
      "Personalizada, escolha: verde, azul ou rosa.",
    ],
    image: "./assets/img/rgs.png",
    color: "#F9B960",
  },
  certidao: {
    title: "Certidão de Nascimento",
    benefits: [
      "Informações de onde o seu pet nasceu.",
      "Personalizada com foto.",
      "Observações e caracteristicas do seu pet.",
    ],
    image: "./assets/img/certidao.png",
    color: "#5e8cb4"
  },
  tag: {
    title: "TAG de identificação",
    benefits: [
      "É escaneada com a camera de qualquer celular.",
      "Página exclusiva com os dados seus e do pet.",
      "Notificação no e-mail quando a tag é escaneada.",
    ],
    image: "./assets/img/tags.png",
    color: "#99ae67",
  },
};

function startServices() {
  const benefitsCard = document.querySelectorAll("div.benefits-card");
  const benefitBody = document.querySelector("div#benefit-body");

  benefitsCard.forEach(el => el.addEventListener("click", openBenefit));
  fillInDataBenefit(benefitBody, servicesData.rg);
}

function openBenefit() {
  const header = document.querySelector("header.header");
  const benefitBody = document.querySelector("div#benefit-body");
  
  const benefit = this.dataset.benefit;

  if (benefit && servicesData[benefit]) {
    fillInDataBenefit(benefitBody, servicesData[benefit]);
    smoothScrollTo(0, benefitBody.offsetTop - header.clientHeight - 20, 800);
  }
}

function fillInDataBenefit(benefitBody, benefit) {
  benefitBody.style.backgroundColor = benefit.color
  benefitBody.querySelector("img").src = benefit.image;
  benefitBody.querySelector("h2").innerText = benefit.title;
  benefitBody.querySelector("ul").innerHTML = "";

  benefit.benefits.forEach(el => {
    const item = document.createElement("li");
    item.innerHTML = `<p>${el}</p>`;

    benefitBody.querySelector("ul").appendChild(item);
  });
}
// SERVICES END

// PHASES START
const phasesData = {
  step1: {
    title: "Faça seu cadastro",
    body: "Preencha seus dados e faça seu registro é gratuito.",
  },
  step2: {
    title: "Cadastre seus pets",
    body: "Após seu registro, faça login e cadastre seus Pets após isso solicite o tipo de documento desejado efetue o pagamento referente ao documento selecionado e pronto.",
  },
  step3: {
    title: "Receba os arquivos em PDF",
    body: "Enviamos no seu e-mail os arquivos para imprimir e plastificar ou você pode baixar na área do cliente.",
  }
};

const phaseActive = "active-phase";

function startPhases() {
  const buttonPhase = document.querySelectorAll("div.phases-list button");
  
  buttonPhase.forEach(el => el.addEventListener("click", openPhase));
}

function openPhase() {
  const phase = this.dataset.phase;
  const phasesDetails = document.querySelector("div#phases-details");
  const phaseData = phasesData[phase];
  const buttonPhase = document.querySelectorAll("div.phases-list button");
  const header = document.querySelector("header.header");

  if (phasesDetails.querySelectorAll("h3")[1]) {
    buttonPhase.forEach(el => {
      if (el.dataset.phase === phase) el.classList.add(phaseActive);
        else el.classList.remove(phaseActive);
    });
    phasesDetails.querySelectorAll("h3")[1].innerText = phaseData.title;
    phasesDetails.querySelector("p").innerText = phaseData.body;
    smoothScrollTo(0, phasesDetails.offsetTop - header.clientHeight - 20, 800);
  }
}
// PHASES END

// UTILS START
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
// UTILS END
