import { fetchGenres } from './fetch-genres'

export function savingGenresArr (){
    fetchGenres().then(data => {
        localStorage.setItem("genres", JSON.stringify(data.genres));
    })
}