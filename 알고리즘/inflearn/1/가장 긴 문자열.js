// 내가 작성한 코드
function solution(arr) {
  let answer = arr.reduce((a, b) => (a.length < b.length ? b : a));

  return answer;
}

console.log(solution(['teacher', 'time', 'student', 'beautiful', 'good']));

// 답안 코드
function solution(arr) {
  let answer,
    max = Number.MIN_SAFE_INTEGER;

  for (let x of arr) {
    if (x.length > max) {
      max = x.length;
      answer = x;
    }
  }

  return answer;
}

console.log(solution(['teacher', 'time', 'student', 'beautiful', 'good']));
