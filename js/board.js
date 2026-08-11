const parms = new URLSearchParams(window.location.search);
const id = parms.get("id")
const templates = JSON.parse(localStorage.getItem("templates")) || [];
const board = templates.find((template) => template.id === id)

console.log(board)

lucide.createIcons();