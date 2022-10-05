import {getRandomPositiveInt, getRandomArrayElement} from './util.js';

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
       message: getRandomArrayElement(sentences),
       name: names[getRandomPositiveInt(0, names.length - 1)],
     };
   }
   return comments;
 }

 export function createImageDescriptions(amount = 26) {
   const descriptions = [];
   for (let i = 1; i < amount; i++) {
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
