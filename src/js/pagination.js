import Pagination from 'tui-pagination';
import { pageRender } from './page-render';
import { toggleLightTheme } from './day-night-theme';

const pagination = new Pagination(document.getElementById('pagination'), {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
});

pagination.on('afterMove', function (eventData) {
  pageRender(eventData.page);
  toggleLightTheme();
});
