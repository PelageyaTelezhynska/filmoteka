import { markupTrending } from './render-trending'
import { fetchTrending } from './fetch-trending'

export function init() {
    fetchTrending().then(data => {        
        // console.log(data.results);
        markupTrending(data.results);
    })    
}