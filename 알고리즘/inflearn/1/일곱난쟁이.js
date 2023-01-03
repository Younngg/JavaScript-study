// 내가 작성한 코드
function solution(arr) {
  let length = 0;
  let answer = [];

  arr.forEach((ele, i) => {
    answer.push(ele);
    length += ele;
    if (length > 100) {
      length = length - ele - arr[i - 1];
      answer.pop();
      answer.pop();
    }
  });

  return answer;
}

console.log(solution([20, 7, 23, 19, 10, 15, 28, 8, 13]));

// 답안 코드
// sum - (arr[i] + arr[j]) === 100

function solution2(arr) {
  let answer = arr;
  let sum = arr.reduce((a, b) => a + b, 0);

  endOfCircuit: for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (sum - (arr[i] + arr[j]) === 100) {
        arr.splice(j, 1);
        arr.splice(i, 1);

        break endOfCircuit;
      }
    }
  }

  return answer;
}

console.log(solution2([20, 7, 23, 19, 10, 15, 28, 8, 13]));
