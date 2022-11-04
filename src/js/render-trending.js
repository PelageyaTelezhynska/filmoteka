import markupTrending from './templates/markup-trending.hbs'

export function renderMarkupTrending (data) {
    // console.log(markupTrending(data));
    document.body.insertAdjacentHTML('beforeend', markupTrending(data));
}