// 내가 작성한 코드
function solution(arr) {
  const odd = arr.filter((n) => n % 2 !== 0);
  const sum = odd.reduce((pre, cur) => pre + cur, 0);
  const min = Math.min(...odd);

  return [sum, min];
}

console.log(solution([12, 77, 38, 41, 53, 92, 85]));

// 답안 코드
function solution2(arr) {
  let answer = [];
  let sum = 0,
    min = Number.MAX_SAFE_INTEGER;
  for (let x of arr) {
    if (x % 2 === 1) {
      sum += x;
      if (x < min) min = x;
    }
  }
  answer.push(sum, min);

  return answer;
}

console.log(solution2([12, 77, 38, 41, 53, 92, 85]));
