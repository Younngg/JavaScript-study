// 내가 작성한 코드
function solution(n) {
  const answer = Array(n)
    .fill()
    .map((v, i) => i + 1)
    .reduce((pre, cur) => pre + cur, 0);

  return answer;
}

solution(10);

// 강의 답안(반복문 활용)
function solution2(n) {
  let answer = 0;
  for (let i = 1; i <= n; i++) {
    answer += i;
  }
  return answer;
}

console.log(solution2(10));
