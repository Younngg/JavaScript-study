// 이진 검색에서는 확인을 할 때마다 남은 항목의 절반을 없앨 수 있다.
// 정렬된 배열만 대상으로 작동함

// 분할 정복
// 중간점을 선택하고 찾는 값이 중간점을 기준으로 좌, 우 중 어느 쪽에 있을지 확인
// 좌측 포인터는 0이고 우측 포인터는 배열의 마지막 인덱스
// 항목을 찾지 못했다면 계산을 계속 하고, 좌측 포인터가 우측보다 앞에 있을 경우만 계속 한다.
// 값을 찾으면 인덱스를 반환하고, 값이 작으면 좌측 포인터를 중간 인덱스로, 값이 크면 우측 포인터를 중간 인덱스로 바꾼다.
// 마지막까지 값을 찾지 못하면 -1을 반환

function binarySearch(arr, val) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let middle = Math.ceil((left + right) / 2);
    if (arr[middle] === val) {
      return middle;
    } else if (arr[middle] > val) right = middle;
    else left = middle;
  }

  return -1;
}

binarySearch([1, 2, 3, 4, 5], 2); // 1
binarySearch([1, 2, 3, 4, 5], 3); // 2
binarySearch([1, 2, 3, 4, 5], 5); // 4
binarySearch([1, 2, 3, 4, 5], 6); // -1
binarySearch(
  [
    5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98,
    99,
  ],
  10
); // 2
binarySearch(
  [
    5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98,
    99,
  ],
  95
); // 16

console.log(
  binarySearch(
    [
      5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98,
      99,
    ],
    100
  )
);

// O(log n)
