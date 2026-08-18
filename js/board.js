//start-up
const updateIcons = () => {
    lucide.createIcons()
}

document.addEventListener('DOMContentLoaded', () => {
    updateIcons();  
    createTopicFunct();
})

// setup
const parms = new URLSearchParams(window.location.search);
const id = parms.get("id")
const templates = JSON.parse(localStorage.getItem("templates")) || [];
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
            alert('Digite um título para criar a lista!');
            nameInputSet.focus()
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