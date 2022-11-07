import Pagination from 'tui-pagination';
import { pageRender } from './page-render';
import { fetchTrending } from './fetch-trending';

let trendingTotalResults = 20000;

fetchTrending(1).then(data => {
    trendingTotalResults = data.total_results;
    setTotalItems();

    function setTotalItems () {
        const totalResults = trendingTotalResults;
    
        if (totalResults) {
            const pagination = new Pagination(document.getElementById('pagination'), {
                totalItems: totalResults,
                itemsPerPage: 20,
                visiblePages: 5,
                centerAlign: true,
            });
            
            pagination.on('afterMove', function(eventData) {
                pageRender(eventData.page);
                localStorage.setItem("current_page", pagination.getCurrentPage());
            });

            pagination.movePageTo(localStorage.getItem('current_page'));
        } else {
            const pagination = new Pagination(document.getElementById('pagination'), {
                totalItems: 20000,
                itemsPerPage: 20,
                visiblePages: 5,
                centerAlign: true,
            });
            
            pagination.on('afterMove', function(eventData) {
                pageRender(eventData.page);
                localStorage.setItem("current_page", pagination.getCurrentPage());
            });

            pagination.movePageTo(localStorage.getItem('current_page'));
        }
    }
})