// 내가 작성한 코드
function solution(str) {
  let answer = str.split('').filter((ele) => ele.toUpperCase() === ele);

  return answer.length;
}

console.log(solution('KoreaTimeGood'));

// 답안 코드1
function solution2(str) {
  let answer = 0;

  for (let x of str) {
    if (x === x.toUpperCase()) answer++;
  }

  return answer;
}

console.log(solution2('KoreaTimeGood'));

// 답안 코드2
function solution3(str) {
  let answer = 0;

  for (let x of str) {
    let num = x.charCodeAt();
    if (num >= 65 && num <= 90) answer++;
  }

  return answer;
}

console.log(solution3('KoreaTimeGood'));
