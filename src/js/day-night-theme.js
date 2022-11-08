export function toggleLightTheme() {
  const themeContainer = document.querySelector('.themetoggle__container');
  const lightIcon = document.querySelector('.themetoggle__icon-light');

  themeContainer.addEventListener('click', toggleThemeClick);

  function toggleThemeClick(e) {
    e.preventDefault();
    if (
      e.target.nodeName === 'svg' ||
      e.target.nodeName === 'use' ||
      e.target.nodeName === 'BUTTON'
    ) {
      lightIcon.classList.toggle('is-shown');
      document.body.classList.toggle('js-dark-theme');
    }
  }
}
