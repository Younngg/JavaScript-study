const obj = {
  name: '엘리',
  age: 20,
};

// 코딩하는 시점에 정적으로 접근이 확정됨
obj.name;
obj.age;

// 동적으로 속성에 접근하고 싶을 때 대괄호 표기법 사용
function getValue(obj, key) {
  // return obj.key // obj 안에 key라는 이름의 key가 없기 때문에 접근 불가능
  return obj[key];
}
console.log(getValue(obj, 'name'));

// 대괄호 표기법은 보통 동적으로 무언가를 접근, 추가, 삭제할 때 사용할 수 있다.
function addKey(obj, key, value) {
  obj[key] = value;
}
addKey(obj, 'job', 'engineer');
console.log(obj);

// Computed property 계산된 프로퍼티
let a = 'age';
const user = {
  name: 'Mike',
  [a]: 30, // age:30
};
