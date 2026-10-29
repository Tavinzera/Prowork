//Icons
const updateIcons = () => {
    lucide.createIcons()
}

document.addEventListener('DOMContentLoaded', () => {
    updateIcons();  
})

// Get Template ID
const parms = new URLSearchParams(window.location.search);
if(parms.has("id")) {
  
  console.log("deu certo")
} else {
    window.location.href = "index.html"
    throw new Error("Board not found") 
}
const id = parms.get("id")

//Loading template storage
const templates = JSON.parse(localStorage.getItem("templates")) || [];
const currentTemplate = templates.find((template) => template.id === id)
if (!currentTemplate){
    window.location.href = "index.html"
}
console.log(currentTemplate.sets)

//Updating storage
const updateStorage = () => {
    localStorage.setItem("templates", JSON.stringify(templates));
}

//Components
const componetList = (id, name, cards) => {
  panel.lastElementChild.insertAdjacentHTML(
    "beforebegin",
    `<li class="list" data-id="${id}" draggable="true">
          <div class="set lists">
            <div class="titleListArea">
              <textarea name="listTitle" data-id="${name}" class="textareaList">${name}</textarea>
              <span class="listCount">0</span>
              <div class="rightDropdown">
                <button class="config">
                  <i data-lucide="settings" class="icon16"> </i>
                </button>
                <div class="configMenu">
                  <div class="configOption" id="del">
                    <i data-lucide="trash" class="icon16"></i>
                    <h1 class="configText">Deletar</h1>
                  </div>
                  <div class="configOption">melancia</div>
                  <div class="configOption">tomates</div>
                </div>
              </div>
            </div>
            <ol class="cardsList lines" data-id>
              ${cards}
            </ol>
            <ol class="cardsList textArea" style="display: none">
              <li>
                <textarea name="cardName" id="${name}" class="cardNameSelect"></textarea>
                <div class="bottomTextArea">
                  <button type="button" class="submitNameSelect">Adicionar Lista</button>
                  <button class="cancelNewCard">
                    <i data-lucide="X" class="icon16 x"></i>
                  </button>
                </div>
              </li>
            </ol>
            <div class="addNewCard" style="display: block">
              <button class="addNewCardBtn">
                <i data-lucide="plus" class="icon16"></i>
                <span>Adicionar um cartão</span>
              </button>
            </div>
          </div>
        </li>
      `
    )
}

const componentCard = (id, name) => {
  return `
            <li data-id="${id}" class="cardLine" draggable="true">
                    <input type="checkbox" class="lineFinished" />
                    <span class="lineTitle" id="${name}">${name}</span>
                    <div class="iconsLine">
                        <i data-lucide="trash-2" class="icon16 delIcon"></i>
                    </div>
            </li>
        `
}

//Render
const panel = document.querySelector('.gridTopic')
const updateRender = () => {
    panel.innerHTML = 
    `
    <div class="current">
          <div class="set" id="createTopic">
            <button class="createTopic">
              <i data-lucide="plus" class="plus"></i>
              <h1 class="createNewSet">Adicionar uma lista</h1>
            </button>
          </div>
          <div class="set" id="createTitle" style="display: none">
            <input
              type="text"
              name="titleSets "
              id="titleSet"
              placeholder="Coloque um titulo"
              required
            />
            <button class="setCreate" type="submit">
              <h1 class="createSetTitle">Adicionar Lista</h1>
            </button>
            <button class="cancelCreate"><i data-lucide="x" class="closeCreate"></i></button>
          </div>
        </div>
    `
    currentTemplate.sets.forEach((list) => {
      let cardsHtml = ""
      list.cards.forEach((card) => {
        cardsHtml += componentCard(card.id, card.name)
      })
      componetList(list.id, list.name, cardsHtml)
    })
}
updateRender()

//Creating lists functions
const createTopic = document.querySelector('#createTopic')
const createTitle = document.querySelector('#createTitle')


panel.addEventListener('click', (event) => {
  if (event.target.closest('.createTopic')) {
    createTitle.style.display = "block"
    createTopic.style.display = "none"
    updateIcons();
  }
})

const cancelCreate = document.querySelector('.cancelCreate')
cancelCreate.addEventListener('click', () => {
createTitle.style.display = "none"
createTopic.style.display = "block"
updateIcons();
})

//Creating new pages
const createNewSubmit = document.querySelector('.setCreate')
const nameInputSet = document.getElementById('titleSet')

createNewSubmit.addEventListener('click', () => {
  const setNewName =  nameInputSet.value
  if(!setNewName.trim()){
    return;
  }

  //push to localStorage\
  let id = `list-${Math.random().toString(36).substring(2, 8)}`
  currentTemplate.sets.push({
    id: id,
    name: setNewName,
    cards: []
  });
  updateStorage()

  createTitle.style.display = "none"
  createTopic.style.display = "block"
  componetList(id, setNewName, [])
  const newList = panel.lastElementChild.previousElementSibling
  setupList(newList)
  nameInputSet.value = ""
  updateIcons()
})

let toggle = false
const warningSetup = document.querySelector('.warningSetup')
const closeDectect = document.querySelector('.closeDetect')
const waring = (color, type, functionName) => {
    if (!toggle){
        closeDectect.style.display = "block"
        closeDectect.style.background = color
        if (type === "del") {
            warningSetup.innerHTML = 
            `
                <h1 class="warningDel">Tem certeza que quer excluir?</h1>
                <div class="buttons">
                    <button class="button" id="confirm">Sim</button>
                    <button class="button" id="decline">Nao</button>
                </div>
            `
            warningSetup.style.display = "block"
        } else if (type === "configBtn") {
            functionName()
        }
        toggle = true
    } else {
        closeDectect.style.display = "none"
        warningSetup.style.display = "none"
        toggle = false
    }
    closeDectect.addEventListener('click', () => {
      waring()
    })
}

//Moving cards

const syncFromDOM = () => {
  const porId = {}
  currentTemplate.sets.forEach(s => s.cards.forEach(c => porId[c.id] = c))

  panel.querySelectorAll('.list').forEach(listEl => {
    const set = currentTemplate.sets.find(s => s.id === listEl.dataset.id)
    if (!set) return

    const linhas = [...listEl.querySelectorAll('.lines .cardLine')]
    set.cards = linhas.map(li => porId[li.dataset.id] || {
      id: li.dataset.id,
      name: li.querySelector('.lineTitle')?.textContent ?? ''
    })

    const contador = listEl.querySelector('.listCount')
    if (contador) contador.textContent = linhas.length
  })

  updateStorage()
}

let placeholder = null
let draggedCard = null
const findCardLoc = (list, posY) => {
  const cards = [...list.querySelectorAll('.cardLine:not(.dragging)')]
  return cards.find(card => {
    const box = card.getBoundingClientRect()
    return posY < box.top + box.height / 2;
  }) || null;
}

panel.addEventListener("dragstart", event => {
  const cardSelected = event.target.closest(".cardLine")
  const listSelected = event.target.closest(".list")
  if (!cardSelected && !listSelected) return
  const currentItem = cardSelected || listSelected
  console.log("voce segurou " + currentItem.className)

  setTimeout(() => {
    placeholder = document.createElement("li")
    placeholder.className = "dragPlaceholder"
    if (draggedCard) {}
    placeholder.style.height = cardSelected.offsetHeight + "px"
    cardSelected.after(placeholder)
    cardSelected.style.display = "none"
  
  }, 0)

})

panel.addEventListener("dragend", () => {
  if(!draggedCard) return
  placeholder?.remove()
  draggedCard.style.display = ""
  draggedCard = ""
  placeholder = ""
  syncFromDOM();
})

let delSelection = null
const setupList = (currentList) => {
    if(!currentList) return

    //Auto change list name
    const textAreaList = currentList.querySelector('.textareaList');
    textAreaList.addEventListener('input', () => {
        textAreaList.dataset.id = textAreaList.value
      let currentId = currentList.dataset.id
      let listIndex = currentTemplate.sets.findIndex(list => list.id === currentId)
      currentTemplate.sets[listIndex].name = textAreaList.value
      updateStorage()
    })

    //auto size
    textAreaList.addEventListener('input', () => {
        textAreaList.style.height = '25px'
        textAreaList.style.height = `${textAreaList.scrollHeight}px`;
    })

    //security textarea
    let lastAreaText = textAreaList.value
    textAreaList.addEventListener('focus', () => {
        lastAreaText = textAreaList.value
    })
    textAreaList.addEventListener('blur', () => {
        if(textAreaList.value === ""){
            textAreaList.value = lastAreaText
        }
    })

    //delete card
    const newCardTextArea = currentList.querySelector('.textArea');
    const menuAddCard = currentList.querySelector('.addNewCard');
    currentList.addEventListener('click', (event) => { 
        const currentCard = event.target.closest('.cardLine')
        if (event.target.closest('.iconsLine')) {
            delSelection = currentCard
            console.log(currentCard)
            console.log(delSelection.dataset.id)
            currentId = currentList.dataset.id
            waring("transparent", "del")
        } if (event.target.closest(".cancelNewCard")) {
            menuAddCard.style.display = "block"
            newCardTextArea.style.display = "none"
        } 
    })

    //count cards number
    const counter = currentList.querySelector('.listCount')
    const linesLoc = currentList.querySelector('.lines')
    counter.innerHTML = linesLoc.children.length
    
    //create new cards
    const newCardBtn = currentList.querySelector('.addNewCardBtn');
    newCardBtn.addEventListener('click', () => {
        menuAddCard.style.display = "none"
        newCardTextArea.style.display = "block"
    })

    const TextAreaListener = currentList.querySelector('.submitNameSelect');
    const cardNameSelect = currentList.querySelector('.cardNameSelect');
    TextAreaListener.addEventListener('click', () => {
        if(!cardNameSelect.value){
            return
        }
        const newName = cardNameSelect.value;
        cardNameSelect.value = ""
        menuAddCard.style.display = "block"
        newCardTextArea.style.display = "none"
        newId = `card-${Math.random().toString(36).substring(2, 8)}`
        linesLoc.insertAdjacentHTML("beforeend", componentCard(newId, newName))
        counter.innerHTML = linesLoc.children.length
        currentId = currentList.dataset.id
        listIndex = currentTemplate.sets.findIndex(list => list.id === currentId)
        currentTemplate.sets[listIndex].cards.push({
          id: newId,
          name: newName,
        })
        updateStorage()
        updateIcons()
    })

    //cards function
    const configBtn = currentList.querySelector('.config')
    const configMenu = currentList.querySelector('.configMenu')
    configBtn.addEventListener('click', () => {
        waring("transparent", "configBtn", configDropRigth)
    })

    const configDropRigth = () => {
        configMenu.style.display = "flex"
    }

    configBtn.addEventListener('click', () => {
        closeDectect.addEventListener('click', () => {
            configMenu.style.display = "none"
        })
        
    })
    
    const configOptions = currentList.querySelectorAll('.configOption')
        configOptions.forEach((configOption) => {
            configOption.addEventListener('click', () => {
                if (configOption.id === "del") {
                    currentList.remove()
                    currentId = currentList.dataset.id
                    listIndex = currentTemplate.sets.findIndex(list => list.id === currentId)
                    currentTemplate.sets.splice(listIndex, 1)
                    updateStorage()
                }
            })
        })
        
  //Dragging cards
  const listArea = currentList.querySelector('.cardsList')
  listArea.addEventListener("dragover", e => {
    if(!draggedCard || !placeholder) return
   e.preventDefault()
    const currentPos = findCardLoc(listArea, e.clientY)
    listArea.insertBefore(placeholder, currentPos)
  })

  listArea.addEventListener("drop", e => {
    e.preventDefault()
    if (!draggedCard || !placeholder) return
    placeholder.replaceWith(draggedCard)   // o card assume o lugar do placeholder
    draggedCard.style.display = ""
  })
}

//Loading lists
const lists = document.querySelectorAll('.list')
lists.forEach((list) => {
  setupList(list)
})
  
warningSetup.addEventListener('click', (event) => {
  const buttons = event.target.closest('.button')
  if(!buttons) {
    return
  }
  if(buttons.id == "confirm") {
    listIndex = currentTemplate.sets.findIndex(list => list.id === currentId)
    cardIndex = currentTemplate.sets[listIndex].cards.findIndex(card => card.id === delSelection.dataset.id)
    console.log(delSelection.dataset.id)
    console.log(cardIndex)
    console.log(listIndex)
    currentTemplate.sets[listIndex].cards.splice(cardIndex, 1)
    delSelection.remove()
    updateStorage()
    waring()
  } else {
    waring()
  }
})

