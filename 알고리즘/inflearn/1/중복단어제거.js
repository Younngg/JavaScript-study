// 내가 작성한 코드
function solution(arr) {
  let answer = [];

  arr.forEach((ele, i) => {
    if (arr.indexOf(ele) >= i) {
      answer.push(ele);
    }
  });

  return answer;
}

console.log(
  solution(['good', 'time', 'time', 'good', 'time', 'student', 'time'])
);

// 다른 방식
function solution2(arr) {
  let answer = arr.filter((ele, i) => arr.indexOf(ele) === i);

  return answer;
}

console.log(
  solution2(['good', 'time', 'time', 'good', 'time', 'student', 'time'])
);
