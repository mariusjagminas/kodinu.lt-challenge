import '../styles/main.scss';

const cardsBoard = document.querySelector('.cards-board');
const btn = document.querySelector('.btn');
const select = document.querySelector('#level');

btn.addEventListener('click', resetGame);
select.addEventListener('change', changeLevel);

let cards = [];
let cardsPair = [];
let level = {
  number: 8,
  styles: 'grid-template-columns: auto auto auto auto; grid-gap: 30px;',
};

function resetGame() {
  initGame();
}

function changeLevel(e) {
  switch (e.target.value) {
    case 'easy':
      level = {
        number: 8,
        styles: 'grid-template-columns: auto auto auto auto; grid-gap: 30px;',
      };
      initGame();
      break;
    case 'medium':
      level = {
        number: 18,
        styles:
          'grid-template-columns: auto auto auto auto auto auto; grid-gap: 10px;',
      };
      initGame();
      break;
    case 'pro':
      level = {
        number: 32,
        styles:
          'grid-template-columns: auto auto auto auto auto auto auto auto; grid-gap: 10px;',
      };
      initGame();
      break;
  }
}

function createCardsNumbers(length) {
  const array = [...Array(length)];
  let numbersArray = [];

  array.forEach((_, i) => {
    numbersArray.push(i);
    numbersArray.push(i);
  });

  return numbersArray;
}

function shuffleNumbers(numbers) {
  return numbers.sort(() => Math.random() - 0.5);
}

function createCard(number) {
  const div = document.createElement('div');
  div.classList.add('card');
  div.setAttribute('data-card', number);
  div.addEventListener('click', handleClick);
  div.innerText = number;
  return div;
}

function addCardsToBoard(cardsNumbers) {
  cardsBoard.innerHTML = '';
  cardsNumbers.forEach((cardNumber) => {
    const card = createCard(cardNumber);
    cardsBoard.appendChild(card);
    cards.push(card);
  });
}

function closeCard(card) {
  card.classList.remove('card--open');
}

function isOpen(card) {
  return card.classList.contains('card--open');
}

function isCardDisabled(card) {
  return card.classList.contains('card--inactive');
}

function disableIfMatches(cardsPair) {
  if (cardsPair[0].dataset.card === cardsPair[1].dataset.card) {
    cardsPair[0].classList.add('card--inactive');
    cardsPair[1].classList.add('card--inactive');
    cardsPair = [];
  }
}

function isAllDisabled() {
  const result = cards.filter(
    (card) => !card.classList.contains('card--inactive')
  );
  return result.length === 0;
}

function handleClick() {
  if (isCardDisabled(this)) return;
  this.classList.toggle('card--open');

  if (cardsPair.length > 1) {
    cardsPair.forEach((card) => closeCard(card));
    cardsPair = [];
  }

  if (!isOpen(this)) {
    cardsPair = [];
  }

  if (isOpen(this)) {
    cardsPair.push(this);
  }

  if (cardsPair.length > 1) {
    disableIfMatches(cardsPair);

    if (isAllDisabled()) {
      console.log('game Over');
    }
  }
}

function initGame() {
  cards = [];
  cardsPair = [];
  cardsBoard.style.cssText = level.styles;
  const cardsNumbers = createCardsNumbers(level.number);
  const shuffledNumbers = shuffleNumbers(cardsNumbers);
  addCardsToBoard(shuffledNumbers);
}

initGame();
