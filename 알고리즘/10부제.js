// 내가 작성한 코드
function solution(day, arr) {
  let answer = 0;

  arr.forEach((e) => {
    if (e % 10 === day) answer += 1;
  });

  return answer;
}

console.log(solution(3, [25, 23, 11, 47, 53, 17, 33]));

// 답안 코드
function solution2(day, arr) {
  let answer = 0;

  for (let x of arr) {
    if (x % 10 === day) answer++;
  }

  return answer;
}

console.log(solution(3, [25, 23, 11, 47, 53, 17, 33]));
