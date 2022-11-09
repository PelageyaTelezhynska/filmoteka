import Pagination from 'tui-pagination';
import { fetchTrending } from './fetch-trending';
import { pageRender } from './page-render';
import { toggleLightTheme } from './day-night-theme';

export function addPagination() {
  fetchTrending(1).then(data => {
    const trendingTotalResults = data.total_results;
    setPagination();

    function setPagination() {
      let totalResults = trendingTotalResults;
      if (!totalResults) totalResults = 20000;

      const pagination = new Pagination(document.getElementById('pagination'), {
        totalItems: totalResults,
        itemsPerPage: 20,
        visiblePages: 5,
        centerAlign: true,
      });

      pagination.on('afterMove', function (eventData) {
        pageRender(eventData.page);
        toggleLightTheme();
        localStorage.setItem('current_page', pagination.getCurrentPage());
      });

      pagination.movePageTo(localStorage.getItem('current_page'));

    }
  });
}
