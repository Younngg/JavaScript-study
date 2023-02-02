const bubbleSort = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
};

console.log(bubbleSort([2, 3, 1]));

// 맨 앞에서부터 시작하는 경우, 코드가 정렬이 되어 있어도 매번 배열의 처음부터 끝까지 실행되어야 함.

// bubbleSort, bubbleSort2 모두 거의 정렬이 된 상태에서도 반복문을 끝까지 돌림
// O(n^2)
const bubbleSort2 = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
};
console.log(bubbleSort2([2, 3, 1]));

const bubbleSort3 = (arr) => {
  let noSwaps;

  for (let i = 0; i < arr.length; i++) {
    noSwaps = true;

    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSwaps = false;
      }
    }

    if (noSwaps) break;
  }
  return arr;
};
console.log(bubbleSort3([2, 3, 1]));
// 이미 정렬된 경우 더이상 비교하지 않음 O(n)
