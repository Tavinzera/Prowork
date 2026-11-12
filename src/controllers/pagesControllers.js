import path from "node:path"
import { publicPath } from "../config/paths.js"

export function home (req, res) {
    res.sendFile(path.resolve("../../public/index.html"))
    return
}

export function board (req, res) {
    res.sendFile(path.join(publicPath, "/board.html"))
    return
}
