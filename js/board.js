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
        <div class="set lists" id="Test">
        <div class="titleListArea">
            <textarea name="listTitle" id="Test" class="textareaList">${list.name}</textarea>
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
    )})
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

const panel = document.querySelector('.gridTopic')
createTitle.style.display = "none"
createTopic.style.display = "block"
panel.lastElementChild.insertAdjacentHTML(
    "beforebegin",
    `<li class="setList">
        <div class="set lists" id="Test">
        <div class="titleListArea">
            <textarea name="listTitle" id="Test" class="textareaList">${setNewName}</textarea>
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
nameInputSet.value = ""
listsListener();
updateIcons()
})

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

let delSelection = null
const listsListener = () => {
const lists = document.querySelectorAll('.lists')

lists.forEach((currentList) => {
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
    /* para cada linha */
    
    const delFunct = () => {
            const buttons = document.querySelectorAll('.button')
            buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    if (button.id == "confirm") {
                    delSelection.closest("li").remove()
                    waring()
                } else {
                    waring()
                }
                })
                
            })
            
        }
    })}
    