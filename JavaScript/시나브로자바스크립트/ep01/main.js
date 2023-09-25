// innerHTML and its inefficiency

document.querySelector('#app').innerHTML = `
<input />
<button>Click</button>
`;

document.querySelector('button').addEventListener('click', () => {
  const currentValue = document.querySelector('input').value;

  document.querySelector('input').value = currentValue + '*';
});

let count = 0;

setInterval(() => {
  count += 1;
  document.querySelector('#app').innerHTML = `
    <input />
    <button>Click</button>
    <p>count:${count}</p>
  `;
}, 5000);
