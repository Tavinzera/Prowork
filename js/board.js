//start-up
const updateIcons = () => {
    lucide.createIcons()
}

// setup
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
const sets = board.sets;

//basic functions
const createTopicFunct = () => {
    const createTopic = document.querySelector('.createTopic')
    createTopic.addEventListener('click', () => {
    const currentCreate = document.querySelector('.current')
    currentCreate.innerHTML = `
        <div class="set" id="createTitle">
            <input type="text" name="titleSets " id="titleSet" placeholder="Coloque um titulo" required/>
            <button class="setCreate" type="submit"><h1 class="createSetTitle">Adicionar Lista</h1></button>
            <button class="cancelCreate"><i data-lucide="x" class="closeCreate"></i></button>
          </div>
    `
    updateIcons();
    createNewTopic();
})}

document.addEventListener('DOMContentLoaded', () => {
    updateIcons();  
    createTopicFunct();
})

const cancelCreate = () => {
    const cancelCreateTopic = document.querySelector('.cancelCreate')
    cancelCreateTopic.addEventListener('click', () => {
        const currentCreate = document.querySelector('.current')
        currentCreate.innerHTML = `
            <div class="set" id="createTopic">
                <button class="createTopic">
                <i data-lucide="plus" class="plus"></i>
                <h1 class="createNewSet">Adicionar uma lista</h1>
            </button>
            </div>
        `
        updateIcons()
        createTopicFunct();
    })
}

const panel = document.querySelector('.gridTopic')
const createNewTopic = () => {
    cancelCreate();
    const createNewSubmit = document.querySelector('.setCreate')
    const nameInputSet = document.getElementById('titleSet')
    createNewSubmit.addEventListener('click', () => {
        if(!nameInputSet.value.trim()){
            return;
        }
        const setNewName =  nameInputSet.value
        const currentCreate = document.querySelector('.current')
        currentCreate.innerHTML = `
            <div class="set" id="createTopic">
                <button class="createTopic">
                    <i data-lucide="plus" class="plus"></i>
                    <h1 class="createNewSet">Adicionar uma lista</h1>
                </button>
            </div>
        `
        panel.lastElementChild.insertAdjacentHTML(
            "beforebegin",
            `<li class="setList">
          <div class="set lists" id="Test">
            <div class="titleListArea">
              <textarea name="listTitle" id="Test" class="textareaList">Test</textarea>
              <span class="listCount">0</span>
              <i data-lucide="settings" class="icon16"></i>
            </div>
            <ol class="cardsList lines"></ol>
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
        litsListener();
        createTopicFunct();
        updateIcons()
    })
}

let toggle = 0
const warningSetup = document.querySelector('.warningSetup')
const closeDectect = document.querySelector('.closeDetect')
const waring = (color, type, functionName) => {

    if (toggle == 0){
        closeDectect.style.display = "block"
        closeDectect.style.background = color
        warningSetup.style.display = "block"
        if (type == "del") {
            warningSetup.innerHTML = 
            `
                <h1 class="warningDel">Tem certeza que quer excluir?</h1>
                <div class="buttons">
                    <button class="button" id="confirm">Sim</button>
                    <button class="button" id="decline">Nao</button>
                </div>
            `
            functionName()
        }
        closeDectect.addEventListener('click', () => {
            waring()
        })
        toggle += 1
    } else {
        closeDectect.style.display = "none"
        warningSetup.style.display = "none"
        toggle -= 1
    }
}

const litsListener = () => {
const lists = document.querySelectorAll('.lists')
lists.forEach((currentList) => {
    const textAreaList = currentList.querySelector('.textareaList');
    const newCardBtn = currentList.querySelector('.addNewCardBtn');
    const newCardTextArea = currentList.querySelector('.textArea');
    const menuAddCard = currentList.querySelector('.addNewCard');
    const TextAreaListener = currentList.querySelector('.submitNameSelect');
    const cardNameSelect = currentList.querySelector('.cardNameSelect');
    const linesLoc = currentList.querySelector('.lines')

    textAreaList.addEventListener('input', () => {
        textAreaList.style.height = '25px'
        textAreaList.style.height = `${textAreaList.scrollHeight}px`;
    })
    let lastAreaText = textAreaList.value
    currentList.id = textAreaList.value
    textAreaList.addEventListener('focus', () => {
        lastAreaText = textAreaList.value
    })
    textAreaList.addEventListener('blur', () => {
        if(textAreaList.value === ""){
            textAreaList.value = lastAreaText
        }
        currentList.id = textAreaList.value
    })
    newCardBtn.addEventListener('click', () => {
        menuAddCard.style.display = "none"
        newCardTextArea.style.display = "block"
        console.log(currentList.id)
    })
    /*criar nova linha*/
    TextAreaListener.addEventListener('click', () => {
        console.log("clicou")
        if(!cardNameSelect.value){
            return
        }
        const newName = cardNameSelect.value;
        cardNameSelect.value = ""
        console.log(newName);
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
        linesFunct()
    })
    /* para cada linha */
    let delSelection = null
    const delFunct = () => {
            const buttons = document.querySelectorAll('.button')
            buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    if (button.id == "confirm") {
                    const cardLineSelect = currentList.querySelectorAll(".cardLine")
                    cardLineSelect[delSelection].closest("li").remove()
                    waring()
                } else {
                    waring()
                }
                })
                
            })
            
        }
    const linesFunct = () => {
        const cardLines = currentList.querySelectorAll(".cardLine")
        cardLines.forEach((cardLine, index) => {
        const delListen = cardLine.querySelector(".iconsLine")
        delListen.addEventListener('click', () => {
            delSelection = index
            console.log(delSelection)
            waring("transparent", "del", delFunct)
        })
        const cancelNewCard = currentList.querySelector('.cancelNewCard')
        cancelNewCard.addEventListener('click', () => {
        menuAddCard.style.display = "block"
        newCardTextArea.style.display = "none"
    })
    })}
    linesFunct()
    
})}
litsListener();