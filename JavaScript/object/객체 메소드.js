const apple = {
  name: 'apple',
  display: function () {
    console.log(`${this.name}: 🍎`);
  },
};

apple.display();

const user = {
  name: 'Mike',
  age: 30,
};

// Object.assign() : 객체 복제
const cloneUser = user;
console.log(user === cloneUser); // true
// user에는 객체 자체가 저장된 것이 아니라 객체가 저장된 메모리 주소인 참조값이 저장된다. 객체가 복사된 것이 아니라 참조값이 복사된 것

// (초기값, 복사할 객체) 초기값에 객체가 병합됨
const newUser = Object.assign({}, user);
const male = Object.assign({ gender: 'male' }, user); //{ gender: 'male', name: 'Mike', age: 30 }
const changeName = Object.assign({ name: 'Tom' }, user); //{ name: 'Mike', age: 30 }

console.log(user === newUser); // false

// Object.keys() : 키 배열 반환
// Object.values() : 값 배열 반환
const userKey = Object.keys(user); //[ 'name', 'age' ]
const userValue = Object.values(user); // [ 'Mike', 30 ]

// Object.entries() : 키/값 배열 반환
// Object.fromEntries() : 키/값 배열을 객체로
const userEntries = Object.entries(user); //[[ 'name', 'Mike' ], [ 'age', 30 ]]
const userFromEntries = Object.fromEntries(userEntries); //{ name: 'Mike', age: 30 }
