import { getBoard } from './storage.js'

export function board () {
    const path = window.location.pathname
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
