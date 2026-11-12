const templates = JSON.parse(localStorage.getItem("templates")) || []

export function getBoard (id) {
    const template = templates.find(t => t.id === id)
    return template
}

export function update (template) {
    const templateIndex = templates.findIndex(t => t.id === template.id)
    if(templateIndex !== -1){
        templates[templateIndex] = template
    }
    localStorage.setItem("templates", JSON.stringify(templates))
    return console.log("Salvado com sucesso")
}