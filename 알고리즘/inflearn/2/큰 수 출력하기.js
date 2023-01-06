// 내가 작성한 코드
function solution(arr) {
  const answer = arr.filter((v, i) => (v > arr[i - 1] ? v : null));

  return [arr[0], ...answer];
}

console.log(solution([7, 3, 9, 5, 6, 12]));

// 답안 코드
function solution2(arr) {
  let answer = [];
  answer.push(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      answer.push(arr[i]);
    }
  }

  return answer;
}

console.log(solution2([7, 3, 9, 5, 6, 12]));
