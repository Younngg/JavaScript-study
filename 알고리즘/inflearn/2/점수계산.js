// 내가 작성한 코드
function solution(arr) {
  let answer = 0;
  let score = 1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      score = 0;
    } else if (arr[i] === 1 && arr[i - 1] !== 1) {
      score = 1;
      answer += score;
    } else if (arr[i] === 1 && arr[i - 1] === 1) {
      score++;
      answer += score;
    }
  }

  return answer;
}

console.log(solution([1, 0, 1, 1, 1, 0, 0, 1, 1, 0]));

// 답안 코드
function solution(arr) {
  let answer = 0,
    score = 0;

  for (let x of arr) {
    if (x === 1) {
      score++;
      answer += score;
    } else score = 0;
  }

  return answer;
}
