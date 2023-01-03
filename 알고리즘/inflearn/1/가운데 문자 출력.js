// 내가 작성한 코드
function solution(str) {
  let answer;

  if (str.length % 2 === 0) {
    answer = str[str.length / 2 - 1] + str[str.length / 2];
  } else {
    answer = str[parseInt(str.length / 2)];
  }

  return answer;
}

console.log(solution('study'));

// 답안 코드
function solution2(str) {
  let answer;
  let mid = Math.floor(str.length / 2);

  if (str.length % 2 === 1)
    answer = str.substring(mid, mid + 1); // str.substring(mid, 1)
  else answer = str.substring(mid - 1, mid + 1); // str.substring(mid - 1, 2)

  return answer;
}

console.log(solution2('study'));
