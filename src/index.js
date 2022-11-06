import { init } from './js/initialization';

init();
import { pageRender } from './js/page-render';
import { savingGenresArr } from './js/saving-genres-arr';
import './js/pagination';
import './js/fetch-modal';
import './js/modal-film';
// import './js/render-storage';

savingGenresArr();
pageRender(1);
