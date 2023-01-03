// 내가 작성한 코드
function solution(str) {
  let answer = '';
  for (let x of str) {
    if (answer.indexOf(x) === -1) answer += x;
  }

  return answer;
}

console.log(solution('ksekkset'));

// 다른 방식
function solution2(str) {
  let answer = '';
  for (let x of str) {
    if (!answer.includes(x)) answer += x;
  }

  return answer;
}

console.log(solution2('ksekkset'));

// 답안 코드
function solution3(str) {
  let answer = '';

  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) === i) answer += str[i];
  }

  return answer;
}

console.log(solution3('ksekkset'));
