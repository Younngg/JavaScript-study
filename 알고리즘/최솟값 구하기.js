// 내가 작성한 코드
function solution(arr) {
  return Math.min(...arr);
}

console.log(solution([5, 3, 7, 11, 2, 15, 17]));

// 강의 답안
function solution2(arr) {
  let answer,
    min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
  }
  answer = min;

  return answer;
}

console.log(solution2([5, 3, 7, 11, 2, 15, 17]));

// 강의 답안2
function solution3(arr) {
  return Math.min.apply(null, arr); // apply(객체(this), 배열)
}

console.log(solution([5, 3, 7, 11, 2, 15, 17]));
