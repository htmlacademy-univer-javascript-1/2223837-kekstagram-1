const getRandomPositiveInt = (min, max) => min >= 0 && max > min ?
  Math.round(min - 0.5 + Math.random() * (max - min + 1)) :
  -1;

const checkStringLength = (string, maxLength) => string.length <= maxLength;
checkStringLength('В целом всё неплохо. Но не всё.', 14);

const names = ['Анна', 'Мария', 'София', 'Алиса', 'Ева', 'Виктория',
  'Иван', 'Дмитрий', 'Никита', 'Александр', 'Игорь', 'Артём'
];

const sentences = [
  'Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function createRandomComments(amount) {
  const comments = [];
  for (let i = 0; i < amount; i++) {
    comments[i] = {
      id: i + 100,
      avatar: `img/avatar-${getRandomPositiveInt(1, 6)}.svg`,
      message: sentences[getRandomPositiveInt(0, sentences.length - 1)],
      name: names[getRandomPositiveInt(0, names.length - 1)],
    };
  }
  return comments;
}

function createImageDescriptions() {
  const descriptions = [];
  for (let i = 1; i < 26; i++) {
    descriptions[i] = {
      id: i,
      url: `photos/${i}.jpg`,
      description: '',
      likes: getRandomPositiveInt(15, 200),
      comments: createRandomComments(6)
    };
  }
  return descriptions;
}

createImageDescriptions();
