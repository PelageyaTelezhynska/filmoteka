import Pagination from 'tui-pagination';
import { pageRender } from './page-render';
import { toggleLightTheme } from './day-night-theme';

let trendingTotalResults = 20000;

export function addPagination(fetchfoo) {
  fetchfoo.then(data => {
    trendingTotalResults = data.total_results;
    setTotalItems();

    function setTotalItems() {
      const totalResults = trendingTotalResults;

      if (totalResults) {
        const pagination = new Pagination(
          document.getElementById('pagination'),
          {
            totalItems: totalResults,
            itemsPerPage: 20,
            visiblePages: 5,
            centerAlign: true,
          }
        );

        pagination.on('afterMove', function (eventData) {
          pageRender(eventData.page);
          toggleLightTheme();
          localStorage.setItem('current_page', pagination.getCurrentPage());

        });

        pagination.movePageTo(localStorage.getItem('current_page'));
      } else {
        const pagination = new Pagination(
          document.getElementById('pagination'),
          {
            totalItems: 20000,
            itemsPerPage: 20,
            visiblePages: 5,
            centerAlign: true,
          }
        );

        pagination.on('afterMove', function (eventData) {
          pageRender(eventData.page);
          toggleLightTheme();
          localStorage.setItem('current_page', pagination.getCurrentPage());
        });

        pagination.movePageTo(localStorage.getItem('current_page'));
      }
    }
  });
}
