import markupTrending from './templates/markup-trending.hbs'

export function renderMarkupTrending (data) {
    document.querySelector('.movies__list').innerHTML = markupTrending(data);
}

export function insertRenderMarkupTrending (data) {
    document.querySelector('.movies__list').insertAdjacentHTML('beforeend', markupTrending(data));
}