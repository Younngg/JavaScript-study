// 자바스크립트의 선형 검색 메소드

// - indexOf
// - includes
// - find
// - findIndex

// 세트 간격으로 이동하면서 한 번에 하나의 항목을 확인하는 식으로 모든 항목을 확인함

// indexOf 구현
function linearSearch(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === num) return i;
  }
  return -1;
}

console.log(linearSearch([10, 15, 20, 25, 30], 11));
// O(n)
