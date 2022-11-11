import { refs } from './refs';
import frame from 'images/students/frame.png';

export function markupFooterModal(data) {
  const markup = data
    .map(
      item => `<img class="image-frame" src="${frame}" alt='frame' />
  <img src='${item.photo}' alt='${item.nameEn}' width='150' />
  <h3>Name: ${item.nameEn}/ ${item.nameUkr}</h3>
  <p>Role: ${item.role}</p>
  <p>Location: ${item.location}</p>

  <a
    href='${item.githubLink}'
    aria-label='GitHub'
    target='_blank'
    rel='noreferrer noopener nofollow'
  >
    <svg class='icon-soc'>
      <use href='./images/sprite.svg#icon-github'></use>
    </svg>
  </a>
  <a
    href='${item.telegramLink}'
    aria-label='Telegram'
    target='_blank'
    rel='noreferrer noopener nofollow'
  >
    <svg class='icon-soc'>
      <use href='./images/sprite.svg#icon-telegram'></use>
    </svg>
  </a>
  <a
    href='${item.linkedinLink}'
    aria-label='Linkedin'
    target='_blank'
    rel='noreferrer noopener nofollow'
  >
    <svg class='icon-soc'>
      <use href='./images/sprite.svg#icon-linkedin'></use>
    </svg>
  </a>`
    )
    .join('');
  console.log(markup);
  refs.students.innerHTML = markup;
}
