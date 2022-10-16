
// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Подключите модуль в проект.

// {/* <template id="picture">
//     <a href="#" class="picture">
//       <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
//       <p class="picture__info">
//         <span class="picture__comments"></span>
//         <span class="picture__likes"></span>
//       </p>
//     </a>
//   </template> */}

export function createUsersPictures(amount) {
  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const pictureFragment = document.createDocumentFragment();

  for (let i = 1; i <= amount; i++) {
    const userPicture = pictureTemplate.cloneNode(true);
    const image = userPicture.querySelector('.picture__img');
    const commentsCount = userPicture.querySelector('.picture__comments');
    const likesCount = userPicture.querySelector('.picture__likes');
    image.src = `../photos/${i}.jpg`;
    commentsCount.textContent = 4;
    likesCount.textContent = 11;
    pictureFragment.append(userPicture);
  }
  picturesList.append(pictureFragment);
}
