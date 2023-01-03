// 내가 작성한 코드
function solution(str) {
  let answer = str.toUpperCase();

  return answer;
}

console.log(solution('ItisTimeToStudy'));

// 답안 코드1
function solution2(str) {
  let answer = '';

  for (let x of str) {
    if (x === x.toLowerCase()) answer += x.toUpperCase();
    else answer += x;
  }

  return answer;
}

console.log(solution2('ItisTimeToStudy'));

// 답안 코드2
function solution3(str) {
  let answer = '';

  for (let x of str) {
    let num = x.charCodeAt();

    if (num >= 97 && num <= 122) answer += String.fromCharCode(num - 32);
    else answer += x;
  }

  return answer;
}

console.log(solution3('ItisTimeToStudy'));
