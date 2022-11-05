const BASE_URL = 'https://api.themoviedb.org/3/trending/';
const endpoint = 'all/day';
const API_KEY = '90a449e7773f96eeaad80a5e660b8095'

export async function fetchTrending (pageNum) {
    const params = new URLSearchParams({
        api_key: API_KEY,
        page: pageNum,
      });
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?${params}`);        
        if(!response.ok) throw new Error(response.status);
        return response.json();
    } catch (err) {console.log(err)}
}