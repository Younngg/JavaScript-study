// 래퍼객체
// 원시값을 필요에 따라서 관련된 빌트인 객체로 변환한다.
const number = 123; // number 원시 타입
// 함수 호출시 number 원시타입을 감싸고 있는 Number 객체로  감싸짐
console.log(number.toString());
console.log(number); // number 원시타입

const text = 'text';
console.log(text);
text.length; // String 객체
text.trim();

// 값을 만들때마다 객체를 생성하면 메모리를 많이 차지하기 때문에
