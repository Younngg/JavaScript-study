// 내가 작성한 코드
function solution(str) {
  let answer = str
    .split('')
    .map((ele) =>
      ele.toUpperCase() === ele ? ele.toLowerCase() : ele.toUpperCase()
    );

  return answer.join('');
}

console.log(solution('StuDY'));

// 답안 코드
function solution2(str) {
  let answer = '';

  for (let x of str) {
    if (x === x.toUpperCase()) answer += x.toLowerCase();
    else answer += x.toUpperCase();
  }

  return answer;
}

console.log(solution2('StuDY'));
