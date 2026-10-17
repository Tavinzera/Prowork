const reload = () => {
    loadTemplates();
    lucide.createIcons();
    cardListen();
}

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
    blockBg("on", formTemplate, "active")
})

const closeBtn = document.getElementById('closeForm')
closeBtn.addEventListener('click', () => {
    blockBg("off", formTemplate, "active")
})

formTemplate.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('.title-template').value
    const template = {
        id: crypto.randomUUID(),
        title: title,
        visibility: privacy,
        date: new Date().toISOString(),
        color: colorSelected,
        sets: []
    }
    blockBg("off", formTemplate, "active")
    const templates = JSON.parse(localStorage.getItem("templates")) || [];
    templates.push(template)
    localStorage.setItem("templates", JSON.stringify(templates));
    formTemplate.reset();
    reload();
})

const delTemplateBtn = document.querySelector('.delTemplate')
const delBtns = document.querySelectorAll('.delButton')
const cardListen = () => {
    const cards = document.querySelectorAll('.templateCard');
    const del = document.querySelector('.delete');
    cards.forEach((card) => {
    if (card.id !== "demo") {
        card.addEventListener('click', () => {
        const cardId = card.dataset.id
        if(event.target.closest('.delete')){
            blockBg("on", delTemplateBtn, "active")
            const closeBtnDel = document.getElementById('closeDel')
            closeBtnDel.addEventListener(('click'), () => {
                blockBg("off", delTemplateBtn, "active")
            })
            delBtns.forEach((delBtn) => {
                delBtn.addEventListener('click', () => {
                    if(delBtn.id === "confirm"){
                        const templates = JSON.parse(localStorage.getItem("templates"));
                        const newTemplates = templates.filter((template) => {
                            return template.id !== cardId;
                        })
                        localStorage.setItem("templates", JSON.stringify(newTemplates));
                        reload()
                        blockBg("off", delTemplateBtn, "active")
                    } else {
                        blockBg("off", delTemplateBtn, "active")
                    }
                })
            } )
            return
        }    
        window.location.href = `board.html?id=${cardId}`
        
    })
    }
})}

function loadTemplates() {
    const templates = JSON.parse(localStorage.getItem("templates")) || [];
    const container = document.querySelector(".templateShowing")
    container.innerHTML = "";
    templates.forEach((template) => {
        const card = `  
            <div class="templateCard" data-id="${template.id}">
              <div class="backgroundColor" style="background-color: ${template.color}">
                <a class="iconAnchor">
                  <i data-lucide="trash-2" class="templateIcon delete" id="demo"></i>
                  <i data-lucide="external-link" class="templateIcon share"></i>
                </a>
              </div>
              <h1 class="templeTitle">${template.title}</h1>
              <h1 class="templeSubtitle">${template.visibility}</h1>
            </div>
        `;
        container.innerHTML += card;
    })
}

const blockBg = (turn, element, type) => {
    const block = document.querySelector('.block')
    if(turn === "on"){
        block.classList.add("on")
        element.classList.add(type)
        block.addEventListener('click', (event) => {
        if(event.target === block){
            element.classList.remove(type)
            block.classList.remove(turn)
        }
    })
    } if(turn === "off") {
        block.classList.remove("on")
        element.classList.remove(type)
    }
}

delTemplateBtn.addEventListener(('click'), () => {

})

reload()