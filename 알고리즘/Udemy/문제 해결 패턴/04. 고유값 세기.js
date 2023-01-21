// 정렬된 배열에서 고유한 값의 개수를 반환하는 함수

// 내가 작성한 답안
function countUniqueValues(arr) {
  // 새로운 배열 answer을 만든다.
  // arr를 돌면서 answer에 같은 값이 없으면 추가하고, 있으면 추가하지 않는다.
  // answer의 길이를 반환한다.
  const answer = [];

  for (let x of arr) {
    if (!answer.includes(x)) {
      answer.push(x);
    }
  }

  return answer.length;
}

console.log(countUniqueValues([1, 2, 2, 4, 4, 4, 5]));
//O(n^2)

// 강의 답안
function countUniqueValues2(arr) {
  if (arr.length === 0) return 0;
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }

  return i + 1;
}

console.log(countUniqueValues2([1, 2, 2, 4, 4, 4, 5]));
//O(n)
