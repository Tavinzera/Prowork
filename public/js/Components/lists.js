export function createTopic () {
    const current = document.createElement("div")
      current.classList.add("current")
      current.innerHTML = `
          <div class="set" id="createTopicModule">
          </div>
          <div class="set" id="createTitle" style="display: none">
          </div>
        `
      //createTopic Module to make easier to edit :)
      const createTopicModule = current.querySelector("#createTopicModule")
      const createTopic = document.createElement("button")
      createTopic.classList.add("createTopic")
      createTopic.innerHTML = `
          <i data-lucide="plus" class="plus"></i>
          <h1 class="createNewSet">Adicionar uma lista</h1>
        `
    
      //createTitle elements
      const createTitle = current.querySelector("#createTitle")
    
      //input
      const titleSets = document.createElement("input")
      titleSets.id = "titleSet"
      titleSets.name = "titleSet"
      titleSets.type = "text"
      titleSets.placeholder = "Coloque um titulo"
      titleSets.required = "true"
    
      //button create
      const setCreate = document.createElement("button")
      setCreate.classList.add("setCreate")
      setCreate.type = "submit"
    
      //button cancel
      const cancelCreate = document.createElement("button")
      cancelCreate.classList.add("cancelCreate")
    
      const xIcon = document.createElement("i")
      xIcon.dataset.lucide = "x"
      xIcon.classList.add("closeCreate")
      cancelCreate.append(xIcon)
    
      const createSetTitle = document.createElement("h1")
      createSetTitle.classList.add("createSetTitle")
      createSetTitle.textContent = "Adicionar Lista"
      setCreate.append(createSetTitle)
    
      createTitle.append(titleSets, setCreate, cancelCreate)
    
      //building
      createTopicModule.append(createTopic)
    
      //functions for createTopic
      createTopic.addEventListener("click", () => createTopicOn())
}