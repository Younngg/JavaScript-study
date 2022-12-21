function showName(name) {
  console.log(name);
}
showName('Mike');
showName('Mike', 'Tom');
showName();

// arguments
// 함수로 넘어온 모든 인수에 접근
// 함수 내에서 이용 가능한 지역 변수
// length, index
// Array 형태의 객체
// 배열의 내장 메서드 없음(forEach, map)

// 나머지 매개 변수
// 정해지지 않은 개수의 인수를 배열로 나타날 수 있게 함
function showName1(...names) {
  console.log(names);
}

showName1(); // []
showName1('Mike'); // [ 'Mike' ]
showName1('Mike', 'Tom'); // [ 'Mike', 'Tom' ]

function add(...numbers) {
  let result = 0;
  numbers.forEach((num) => (result += num));
  console.log(results);
}
