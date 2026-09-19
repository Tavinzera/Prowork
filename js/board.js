//start-up
const updateIcons = () => {
    lucide.createIcons()
}

document.addEventListener('DOMContentLoaded', () => {
    updateIcons();  
})

// Loading config
const parms = new URLSearchParams(window.location.search);
console.log(parms)
if(parms.has("id")) {
} else {
    console.log("Deu certo")
    window.location.href = "index.html"
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
//Render
const panel = document.querySelector('.gridTopic')
const updateRender = () => {
    board.sets.forEach((list) => {
        panel.lastElementChild.insertAdjacentHTML(
    "beforebegin",
    `<li class="setList">
          <div class="set lists">
            <div class="titleListArea">
              <textarea name="listTitle" id="Test" class="textareaList">${list.name}</textarea>
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
              <li>
                <div class="cardLine">
                  <input type="checkbox" class="lineFinished" />
                  <span class="lineTitle" id="Texto aqui">Texto aqui</span>
                  <div class="iconsLine">
                    <i data-lucide="trash-2" class="icon16 delIcon"></i>
                  </div>
                </div>
              </li>
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
        </li>`
    )
})
}
updateRender()

//Current transition
const createNewSet = document.querySelector('.createTopic')
const cancelCreate = document.querySelector('.cancelCreate')
const createTopic = document.querySelector('#createTopic')
const createTitle = document.querySelector('#createTitle')
createNewSet.addEventListener('click', () => {
createTitle.style.display = "block"
createTopic.style.display = "none"
updateIcons();
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
    //push to localStorage
    board.sets.push({
        name: setNewName,
        cards: []
    });
    updateStorage()

createTitle.style.display = "none"
createTopic.style.display = "block"
panel.lastElementChild.insertAdjacentHTML(
    "beforebegin",
    `<li class="setList">
        <div class="set lists" id="Test">
        <li class="setList">
          <div class="set lists">
            <div class="titleListArea">
              <textarea name="listTitle" id="Test" class="textareaList">${setNewName}</textarea>
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
              <li>
                <div class="cardLine">
                  <input type="checkbox" class="lineFinished" />
                  <span class="lineTitle" id="Texto aqui">Texto aqui</span>
                  <div class="iconsLine">
                    <i data-lucide="trash-2" class="icon16 delIcon"></i>
                  </div>
                </div>
              </li>
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
    </li>`
)
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
            functionName()
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
    const textAreaList = currentList.querySelector('.textareaList');
    const newCardBtn = currentList.querySelector('.addNewCardBtn');
    const newCardTextArea = currentList.querySelector('.textArea');
    const menuAddCard = currentList.querySelector('.addNewCard');
    const TextAreaListener = currentList.querySelector('.submitNameSelect');
    const cardNameSelect = currentList.querySelector('.cardNameSelect');
    const linesLoc = currentList.querySelector('.lines')

    currentList.addEventListener('click', (event) => {
        const delListen = event.target.closest('.iconsLine')
        const cancelNewCard = event.target.closest(".cancelNewCard")
        const createTopic = event.target.closest('.createTopic')
        if (delListen) {
            delSelection = delListen
            waring("transparent", "del", delFunct)
        } if (cancelNewCard) {
            menuAddCard.style.display = "block"
            newCardTextArea.style.display = "none"
        } if (createTopic) {}
    })

    const counter = currentList.querySelector('.listCount')
    counter.textContent = textAreaList.value.length
    textAreaList.addEventListener('input', () => {
        counter.textContent = textAreaList.value.length
    })

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
        linesLoc.insertAdjacentHTML("beforeend", `
            <li>
                <div class="cardLine" id="${newName}">
                    <input type="checkbox" class="lineFinished" />
                    <span class="lineTitle" id="Texto aqui">${newName}</span>
                    <div class="iconsLine">
                        <i data-lucide="trash-2" class="icon16 delIcon"></i>
                    </div>
                </div>
            </li>
        `)
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
                    
                }
            })
        })
}
const lists = document.querySelectorAll('.setList')
lists.forEach((list) => {
    setupList(list)
})  