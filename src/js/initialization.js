import { markupTrending } from './render-trending'
import { fetchTrending } from './fetch-trending'

export function init() {
    fetchTrending().then(data => {
        data.results.map(elem => {
            if (elem.release_date) elem.release_date = elem.release_date.slice(0, 4);
            if (elem.first_air_date) elem.first_air_date = elem.first_air_date.slice(0, 4);
        })
        markupTrending(data.results);
    })    
}