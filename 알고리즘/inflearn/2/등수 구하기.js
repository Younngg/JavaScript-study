// 내가 작성한 코드
function solution(arr) {
  let answer = [];
  let sort = [...arr].sort((a, b) => b - a);

  for (let i = 0; i < arr.length; i++) {
    const rank = sort.indexOf(arr[i]) + 1;

    answer[i] = rank;
  }

  return answer;
}

console.log(solution([87, 89, 100, 100, 76]));

// 답안 코드
function solution2(arr) {
  let n = arr.length;
  let answer = Array.from({ length: n }, () => 1);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[j] > arr[i]) answer[i]++;
    }
  }

  return answer;
}

console.log(solution2([87, 89, 100, 100, 76]));
