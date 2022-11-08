export function toggleLightTheme() {
  const themeContainer = document.querySelector('.themetoggle__container');
  const lightIcon = document.querySelector('.themetoggle__icon-light');
  const footerRef = document.querySelector('.footer');

  themeContainer.addEventListener('click', toggleThemeClick);

  function toggleThemeClick(e) {
    e.preventDefault();
    if (
      e.target.nodeName === 'svg' ||
      e.target.nodeName === 'use' ||
      e.target.nodeName === 'BUTTON'
    ) {
      lightIcon.classList.toggle('is-shown');
      //   console.log(moviesTitleArr);
      if (lightIcon.classList.contains('is-shown')) {
        // console.log('dark true');
        document.body.classList.add('js-dark-theme');
        footerRef.classList.add('js-dark-theme');
      } else {
        // console.log('dark false');
        document.body.classList.remove('js-dark-theme');
        footerRef.classList.remove('js-dark-theme');
      }
    }
  }
}
