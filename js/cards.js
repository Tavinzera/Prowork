export function cards(id, name) {
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

const icons = document.createElement("iconsLine")
icons.classList.add("iconsLine")

const icon = document.createElement("i")
icon.dataset.lucide = "trash-2"
icon.classList.add("icon16 delIcon")

card.append(input, title)
card.insertAdjacentHTML("beforeend", `
        <div class="iconsLine">
            <i data-lucide="trash-2" class="icon16 delIcon"></i>
        </div>
        `
    );
    console.log("criado os card" + card)
    return card

}