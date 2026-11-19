import { getBoard } from './storage.js'

const path = window.location.pathname

export function board () {  
    if(path === '/') {
        return {
            page: 'home',
            data: null
        }
    }

    if(path.startsWith('/board/')) {
        const id = path.split('/').pop()
        if(!id) {
            return {
                page: 'home',
                data: null,
            }
        }
        return {
            page: 'board',
            data: getBoard(id)
        }
    }    
}
