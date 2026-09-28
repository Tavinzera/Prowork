//start-up
const updateIcons = () => {
    lucide.createIcons()
}

document.addEventListener('DOMContentLoaded', () => {
    updateIcons();  
})

// Loading config
const parms = new URLSearchParams(window.location.search);
if(parms.has("id")) {
} else {
    console.log("Deu certo")
    window.location.href = "index.html"
    throw new Error("Board not found")
    
}
const templates = JSON.parse(localStorage.getItem("templates")) || [];
const id = parms.get("id")
const board = templates.find((template) => template.id === id)
if (!board){
    window.location.href = "index.html"
}
console.log(board.sets)
//Updating storage
const updateStorage = () => {
    localStorage.setItem("templates", JSON.stringify(templates));
}

//Structures
const listFunct = (id, name, cards) => {
  panel.lastElementChild.insertAdjacentHTML(
    "beforebegin",
    `<li class="setList" data-id="${id}">
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
            <ol class="cardsList lines">
              ${cards}
            </ol>
            <ol class="cardsList textArea" style="display: none">
              <li>
                <textarea name="cardName" id="cardName" class="cardNameSelect"></textarea>
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

const cardFunct = (id, name) => {
  return `
            <li data-id="${id}" class="line" draggable="true">
                <div class="cardLine" id="${name}">
                    <input type="checkbox" class="lineFinished" />
                    <span class="lineTitle" id="Texto aqui">${name}</span>
                    <div class="iconsLine">
                        <i data-lucide="trash-2" class="icon16 delIcon"></i>
                    </div>
                </div>
            </li>
        `
}

//Render
const panel = document.querySelector('.gridTopic')
const updateRender = () => {
    panel.innerHTML = ""
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
    board.sets.forEach((list) => {
      let cardsHtml = ""
      list.cards.forEach((card) => {
        cardsHtml += cardFunct(card.id, card.name)
      })
      listFunct(list.id, list.name, cardsHtml)
})
}
updateRender()

//Current transition
const createNewSet = document.querySelector('.createTopic')
const cancelCreate = document.querySelector('.cancelCreate')
const createTopic = document.querySelector('#createTopic')
const createTitle = document.querySelector('#createTitle')
panel.addEventListener('click', (event) => {
  const createNewSet = event.target.closest('.createTopic')
  if (createNewSet) {
    createTitle.style.display = "block"
    createTopic.style.display = "none"
    updateIcons();
  }
})
cancelCreate.addEventListener('click', () => {
createTitle.style.display = "none"
createTopic.style.display = "block"
updateIcons();
})
//Creating new pages
const createNewSubmit = document.querySelector('.setCreate')
const nameInputSet = document.getElementById('titleSet')
createNewSubmit.addEventListener('click', () => {
    if(!nameInputSet.value.trim()){
        return;
    }
    const setNewName =  nameInputSet.value
    //push to localStorage\
    let id = `list-${Math.random().toString(36).substring(2, 8)}`
    board.sets.push({
        id: id,
        name: setNewName,
        cards: []
    });
    updateStorage()

createTitle.style.display = "none"
createTopic.style.display = "block"
listFunct(id, setNewName, [])
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

let delSelection = null
const setupList = (currentList) => {
    if(!currentList){
      return
    }

    const textAreaList = currentList.querySelector('.textareaList');
    const newCardBtn = currentList.querySelector('.addNewCardBtn');
    const newCardTextArea = currentList.querySelector('.textArea');
    const menuAddCard = currentList.querySelector('.addNewCard');
    const TextAreaListener = currentList.querySelector('.submitNameSelect');
    const cardNameSelect = currentList.querySelector('.cardNameSelect');
    const linesLoc = currentList.querySelector('.lines')
    const cardList = currentList.querySelector('.cardsList')

    currentList.id = textAreaList.value
    textAreaList.addEventListener('input', () => {
        textAreaList.dataset.id = textAreaList.value
      let currentId = currentList.dataset.id
      let listIndex = board.sets.findIndex(list => list.id === currentId)
      board.sets[listIndex].name = textAreaList.value
      updateStorage()
    })

    currentList.addEventListener('click', (event) => {
        const delListen = event.target.closest('.iconsLine')
        const cancelNewCard = event.target.closest(".cancelNewCard")
        const currentCard = event.target.closest('.line')
        if (delListen) {
            delSelection = currentCard
            currentId = currentList.dataset.id
            waring("transparent", "del")
        } if (cancelNewCard) {
            menuAddCard.style.display = "block"
            newCardTextArea.style.display = "none"
        } 
    })

    const counter = currentList.querySelector('.listCount')
    counter.innerHTML = linesLoc.children.length

    /*textArea*/
    textAreaList.addEventListener('input', () => {
        textAreaList.style.height = '25px'
        textAreaList.style.height = `${textAreaList.scrollHeight}px`;
    })
    let lastAreaText = textAreaList.value
    textAreaList.addEventListener('focus', () => {
        lastAreaText = textAreaList.value
    })
    textAreaList.addEventListener('blur', () => {
        if(textAreaList.value === ""){
            textAreaList.value = lastAreaText
        }
    })
    newCardBtn.addEventListener('click', () => {
        menuAddCard.style.display = "none"
        newCardTextArea.style.display = "block"
    })
    /*criar nova linha*/
    TextAreaListener.addEventListener('click', () => {
        if(!cardNameSelect.value){
            return
        }
        const newName = cardNameSelect.value;
        cardNameSelect.value = ""
        menuAddCard.style.display = "block"
        newCardTextArea.style.display = "none"
        newId = `list-${Math.random().toString(36).substring(2, 8)}`
        linesLoc.insertAdjacentHTML("beforeend", cardFunct(newId, newName))
        counter.innerHTML = linesLoc.children.length
        currentId = currentList.dataset.id
        listIndex = board.sets.findIndex(list => list.id === currentId)
        board.sets[listIndex].cards.push({
          id: newId,
          name: newName,
        })
        updateStorage()
        updateIcons()
    })

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
                    listIndex = board.sets.findIndex(list => list.id === currentId)
                    board.sets.splice(listIndex, 1)
                    updateStorage()
                }
            })
        })
  let draggedCard = null
  cardList.addEventListener("dragstart", (event) => {
    const card = event.target.closest(".line")
    if (!card) {
    }
    console.log("arrastando", card.id)
    draggedCard = card
  })
}
const lists = document.querySelectorAll('.setList')
lists.forEach((list) => {
    setupList(list)
})  
warningSetup.addEventListener('click', (event) => {
  const buttons = event.target.closest('.button')
  if(!buttons) {
    return
  }
  if(buttons.id == "confirm") {
    listIndex = board.sets.findIndex(list => list.id === currentId)
    cardIndex = board.sets[listIndex].cards.findIndex(card => card.id === delSelection.dataset.id)
    console.log(delSelection.dataset.id)
    console.log(cardIndex)
    console.log(listIndex)
    board.sets[listIndex].cards.splice(cardIndex, 1)
    delSelection.remove()
    updateStorage()
    waring()
  } else {
    waring()
  }
})