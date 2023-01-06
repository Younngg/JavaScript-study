// 내가 작성한 코드
function solution(a, b) {
  let answer = '';
  for (let i = 0; i < a.length; i++) {
    if (a[i] === 1 && b[i] === 3) answer += 'A ';
    else if (a[i] === 3 && b[i] === 1) answer += 'B ';
    else if (a[i] > b[i]) answer += 'A ';
    else if (b[i] > a[i]) answer += 'B ';
    else if (a[i] === b[i]) answer += 'D ';
  }
  return answer;
}

console.log(solution([2, 3, 3, 1, 3], [1, 1, 2, 2, 3]));

// 답안 코드
function solution2(a, b) {
  let answer = '';
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) answer += 'D ';
    else if (a[i] === 1 && b[i] === 3) answer += 'A ';
    else if (a[i] === 2 && b[i] === 1) answer += 'A ';
    else if (a[i] === 3 && b[i] === 2) answer += 'A ';
    else answer += 'B ';
  }
  return answer;
}
