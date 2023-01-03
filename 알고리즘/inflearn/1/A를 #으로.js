// 내가 작성한 코드
function solution(str) {
  const arr = str.split('');

  const answer = arr.map((ele) => (ele === 'A' ? (ele = '#') : ele));

  return answer.join('');
}

console.log(solution('BANANA'));

// 답안 코드1

function solution2(str) {
  let answer = '';

  for (let x of str) {
    if (x === 'A') answer += '#';
    else answer += x;
  }

  return answer;
}

console.log(solution2('BANANA'));

// 답안 코드2

function solution3(str) {
  let answer = str.replace(/A/g, '#');

  return answer;
}

console.log(solution3('BANANA'));
