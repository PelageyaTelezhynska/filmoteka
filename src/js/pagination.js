import Pagination from 'tui-pagination';
import { pageRender } from './page-render';
import { fetchTrending } from './fetch-trending';

fetchTrending(1).then(data => {
    // Adds to localStorage the value of total_results
    localStorage.setItem("trending_total_results", data.total_results);
    setTotalItems()

    function setTotalItems () {
        const totalResults = localStorage.getItem('trending_total_results')
    
        if (totalResults) {
            const pagination = new Pagination(document.getElementById('pagination'), {
                totalItems: totalResults,
                itemsPerPage: 20,
                visiblePages: 5,
                centerAlign: true
            });
            
            pagination.on('afterMove', function(eventData) {
                pageRender(eventData.page);
            });
        } else {
            const pagination = new Pagination(document.getElementById('pagination'), {
                totalItems: 20000,
                itemsPerPage: 20,
                visiblePages: 5,
                centerAlign: true
            });
            
            pagination.on('afterMove', function(eventData) {
                pageRender(eventData.page);
            });
        }
    }
})