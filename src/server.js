import express from 'express'
import pagesRoutes from './routes/pages.js'
import { publicPath } from './config/paths.js'
import path from 'path'

console.log(publicPath)

const app = express()
app.use(express.json())

app.use(express.static(path.join(publicPath, '../public')))
app.use('/', pagesRoutes)

app.listen("3000", () => {
    console.log("servidor iniciou")
})