// 내가 작성한 코드
function solution(str, ele) {
  let answer = str.split('').filter((x) => x === ele);

  return answer.length;
}

console.log(solution('COMPUTERPROGRAMMING', 'R'));

// 답안 코드1
function solution2(s, t) {
  let answer = 0;

  for (let x of s) {
    if (x === t) answer++;
  }

  return answer;
}

console.log(solution2('COMPUTERPROGRAMMING', 'R'));

// 답안 코드2
function solution3(str, ele) {
  let answer = str.split(ele);

  return answer.length - 1;
}

console.log(solution3('COMPUTERPROGRAMMING', 'R'));
