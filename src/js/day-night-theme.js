export function toggleLightTheme() {
  const themeContainer = document.querySelector('.themetoggle__container');
  const darkIcon = document.querySelector('.themetoggle__icon-dark');
  const footerRef = document.querySelector('.footer');

  themeContainer.addEventListener('click', toggleThemeClick);

  function toggleThemeClick(e) {
    e.preventDefault();
    if (
      e.target.nodeName === 'svg' ||
      e.target.nodeName === 'use' ||
      e.target.nodeName === 'button'
    ) {
      darkIcon.classList.toggle('is-shown');

      //   console.log(moviesTitleArr);
      if (darkIcon.classList.contains('is-shown')) {
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
