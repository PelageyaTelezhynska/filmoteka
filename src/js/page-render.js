import { renderMarkupTrending } from './render-trending'
import { fetchTrending } from './fetch-trending'

export function pageRender(pageNum) {
    fetchTrending(pageNum).then(data => {
        data.results.map(elem => {
            if (elem.release_date) elem.release_date = elem.release_date.slice(0, 4);
            if (elem.first_air_date) elem.first_air_date = elem.first_air_date.slice(0, 4);
        })
        renderMarkupTrending(data.results);
    })
}