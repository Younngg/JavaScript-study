// 내가 작성한 코드
function solution(arr) {
  let answer = [],
    max = Number.MIN_SAFE_INTEGER;

  arr.forEach((v, i) => {
    if (v > max) {
      max = v;
      answer.push(v);
    }
  });

  return answer.length;
}

console.log(solution([130, 135, 148, 140, 145, 150, 150, 153]));

// 답안 코드
function solution2(arr) {
  let answer = 1,
    max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      answer++;
      max = arr[i];
    }
  }
  return answer;
}

console.log(solution2([130, 135, 148, 140, 145, 150, 150, 153]));
