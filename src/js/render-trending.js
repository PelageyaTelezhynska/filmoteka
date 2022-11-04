import markupTrending from './templates/markup-trending.hbs'

export function markupTrending (data) {
    // console.log(markupTrending(data));
    document.body.insertAdjacentHTML('beforeend', markupTrending(data));
}