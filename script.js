loadTemplates();

const dropdownOpn = document.querySelector('.options');
const dpBtn = document.querySelector('.dropdownBtn');
dpBtn.addEventListener('click', () => {
  dropdownOpn.classList.toggle('active');
});

const publicBtn = document.getElementById('public');
const particularBtn = document.getElementById('particular');
let privacy = "public"
let colorSelected = "purple"
publicBtn.addEventListener('click', () => {
    privacy = "public";
    publicBtn.classList.add('current')
    particularBtn.classList.remove('current')
    dpBtn.textContent = 'Publico'
    dropdownOpn.classList.remove('active')
});

particularBtn.addEventListener('click', () => {
    privacy = "particular";
    publicBtn.classList.remove('current')
    particularBtn.classList.add('current')
    dpBtn.textContent = 'Particular'
    dropdownOpn.classList.remove('active')
});

const colors = document.querySelectorAll('.color')
const demoTemplate = document.querySelector('.template-demo')
const demoCard = demoTemplate.querySelector('.templateCard')
const DemoBackgorund = demoCard.querySelector('.backgroundColor')
colors.forEach((color) => {
    color.style.backgroundColor = color.dataset.color
    color.addEventListener('click', () => {
        colors.forEach((item) => {
            item.classList.remove('selected')
        })
        color.classList.add('selected')
        colorSelected = color.dataset.color;
        DemoBackgorund.style.backgroundColor = color.dataset.color
    })
});

const createTemplate = document.querySelector('.create-template')
const formTemplate = document.querySelector('.form')
createTemplate.addEventListener('click', () => {
    formTemplate.classList.add('active')
})

const closeBtn = document.querySelector('.closeBtn')
closeBtn.addEventListener('click', () => {
    formTemplate.classList.remove('active')
})

formTemplate.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("SUBMIT FUNCIONOU!")
    const title = document.querySelector('.title-template').value
    const template = {
        id: crypto.randomUUID(),
        title: title,
        visibility: privacy,
        date: new Date().toISOString(),
        color: colorSelected,
        sets: []
    }
    console.log(template);
    formTemplate.classList.remove('active')
    const templates = JSON.parse(localStorage.getItem("templates")) || [];
    templates.push(template)
    localStorage.setItem("templates", JSON.stringify(templates));
    console.log(template)
    loadTemplates();
    formTemplate.reset();
})

function loadTemplates() {
    const templates = JSON.parse(localStorage.getItem("templates")) || [];
    const container = document.querySelector(".templateShowing")
    container.innerHTML = "";
    templates.forEach((template) => {
        const card = `
            <div class="templateCard" data-id="${template.id}">
              <div class="backgroundColor" style="background-color: ${template.color}">
                <a class="iconAnchor">
                  <i data-lucide="external-link" class="templateIcon"></i>
                </a>
              </div>
              <h1 class="templeTitle">${template.title}</h1>
              <h1 class="templeSubtitle">${template.visibility}</h1>
            </div>
        `;
        container.innerHTML += card;
    })
}

const cards = document.querySelectorAll('.templateCard')
cards.forEach((card) => {
    if (card.id === "demo") {
        return
    } else {
    card.addEventListener('click', () => {
        const cardId = card.dataset.id      
        window.location.href = `board.html?id=${cardId}`
    })}
})

lucide.createIcons();