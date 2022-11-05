const BASE_URL = 'https://api.themoviedb.org/3/trending/';
const endpoint = 'all/week';
const API_KEY = '90a449e7773f96eeaad80a5e660b8095'

export async function fetchTrending () {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);        
        if(!response.ok) throw new Error(response.status);   
        return response.json();
    } catch (err) {console.log(err)}
}