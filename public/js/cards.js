import { warning } from "./board.js"

export function cardsFunct(id, name, data) {
    if(!id || !name) return
    const card = document.createElement("li")
    card.classList.add("cardLine")
    card.draggable = "true"
    card.dataset.id = id

    const input = document.createElement("input")
    input.type = "checkbox"
    input.classList.add("lineFinished")

    const title = document.createElement("span")
    title.classList.add("lineTitle")
    title.id = name
    title.innerText = name

    //delete
    const icons = document.createElement("iconsLine")
    icons.classList.add("iconsLine")

    const icon = document.createElement("i")
    icon.dataset.lucide = "trash-2"
    icon.classList.add("icon16")
    icon.classList.add("delIcon")
    icons.append(icon)

    let delSelection = 0
    card.addEventListener("click", e => {
    if (e.target.closest(".delIcon")) {
        const dataInfo = {
            card: card,
            list: card.closest(".list").dataset.id
        }
        data(dataInfo)
    }

    })

    card.append(input, title, icons)

    console.log("criado os card" + card)
    return card

}