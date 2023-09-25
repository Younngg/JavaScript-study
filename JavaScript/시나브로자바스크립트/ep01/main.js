// Event handling in bulk

document.querySelector('#app').innerHTML = `
  <button class="btn-add-card" type="button">Add card</button>

  <div class="cards"></div>
`;

let cardCount = 0;

document.querySelector('.btn-add-card').addEventListener('click', () => {
  cardCount += 1;
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-number', cardCount);
  card.innerHTML = `
    <p>Card #${cardCount}</p>
    <button class="btn-hello" type="button" data-number="${cardCount}">hello</button>
  `;

  //클로저
  const myCardCount = cardCount;
  // card.querySelector('.btn-hello').addEventListener('click', () => {
  //   console.log(`hello! ${myCardCount}`);
  // });

  document.querySelector('.cards').appendChild(card);
});

document.querySelector('.cards').addEventListener('click', (event) => {
  const maybeButton = event.target;
  if (maybeButton.matches('.btn-hello')) {
    // const cardName = maybeButton.parentElement.children[0].innerText;
    // console.log('button is clicked', cardName);

    console.log('button is clicked', maybeButton.getAttribute('data-number'));
  }
});
