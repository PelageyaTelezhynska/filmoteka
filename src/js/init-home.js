import { pageRender } from './page-render';
import { savingGenresArr } from './saving-genres-arr';
import {addPagination} from './pagination';
import {renderGenreSelect} from './genre-select-render';
import './genre-filter';

if (!localStorage.getItem('UserID'))localStorage.setItem('UserID', 'DefaultUser');
savingGenresArr();
renderGenreSelect();
pageRender(1);
addPagination();