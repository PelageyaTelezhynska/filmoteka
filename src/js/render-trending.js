import markupTrending from './templates/markup-trending.hbs'

export function renderMarkupTrending (data) {
    // console.log(markupTrending(data));
    document.querySelector('.movies__list').insertAdjacentHTML('beforeend', markupTrending(data));
}