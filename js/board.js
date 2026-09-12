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
        createTopicFunct();
        updateIcons()
    })
}

const closeDectect = document.querySelector('.closeDetect')
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
        textAreaList.style.height = 'auto'
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
        if(!cardNameSelect.value){
            return
        }
        const newName = cardNameSelect.value;
        cardNameSelect.value = ""
        console.log(newName);
        menuAddCard.style.display = "block"
        newCardTextArea.style.display = "none"
        linesLoc.innerHTML += `
        <li>
                <div class="cardLine" id="${newName}">
                  <input type="checkbox" class="lineFinished" />
                  <span class="lineTitle" id="Texto aqui">${newName}</span>
                  <div class="iconsLine">
                    <i data-lucide="trash-2" class="icon16 delIcon"></i>
                  </div>
                </div>
              </li>
        `
        updateIcons()
    })
    /* para cada linha */
    const cardLines = currentList.querySelectorAll(".cardLine")
    cardLines.forEach((cardLine) => {
        const delListen = cardLine.querySelector(".iconsLine")
        delListen.addEventListener('click', () => {
            closeDectect.style.display = "block"
            
        })
    })
})