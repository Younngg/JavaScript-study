function solution(numbers) {
  const sort = numbers
    .map((v) => v.toString())
    .sort((a, b) => {
      if (a > b) {
        if (
          (a.split('').slice(-1)[0] === '0' &&
            b.split('').slice(-1)[0] === '0') ||
          (b < a && a.split('').slice(-1)[0] === '0')
        ) {
          return a - b;
        }
        return -1;
      } else if (b > a) return 1;
      else if ((a = b)) return 0;
    });

  console.log(sort);

  return;
}

function solution(numbers) {
  const sort = numbers
    .map((v) => v + '')
    .sort((a, b) => b + a - (a + b))
    .join('');

  return sort[0] === '0' ? '0' : sort;
}

console.log(solution([0, 0]));
