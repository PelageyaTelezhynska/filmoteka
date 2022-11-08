import { pageRender } from './page-render';
import { savingGenresArr } from './saving-genres-arr';
import {addPagination} from './pagination'
import { fetchTrending } from './fetch-trending';

savingGenresArr();
pageRender(1);
addPagination(fetchTrending(1));