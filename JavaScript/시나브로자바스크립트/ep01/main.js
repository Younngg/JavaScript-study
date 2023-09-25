document.querySelector('#app').innerHTML = `
<button type="button" class="hello1">hello1</button>
<button type="button" class="hello2">hello2</button>
<button type="button" class="hello3">hello3</button>

<div>
  <input class="name" type="text" placeholder="Type your name:" />
</div>

<div class="parent-of-button">
  <button class="helloworld-button" type="button">
    <span>Hello</span>
    <span>World</span>
  </button>
</div>
`;

document.querySelector('button').addEventListener('click', function (event) {
  const input = document.querySelector('.name');
  console.log(input.value);
});

document.querySelector('.name').addEventListener('input', (event) => {
  console.log(event.target.value);
});

// 이벤트 버블링
document
  .querySelector('.helloworld-button')
  .addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('event from button', event);
  });

document
  .querySelector('.parent-of-button')
  .addEventListener('click', (event) => {
    console.log('event from div', event);
  });

document.querySelector('.name').addEventListener('keyup', (event) => {
  console.log('keyup', event);
});

document.body.addEventListener('keyup', (event) => {
  console.log(event.key);
});
