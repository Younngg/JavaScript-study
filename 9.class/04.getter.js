// 접근자 프로퍼티 (Accessor Property)

class Student {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.lastName} ${this.firstName}`;
  } // 함수보다는 속성에 가까워서, 이런걸 만들 때 get을 붙이면 함수처럼 호출하지 않고 속성에 접근하듯이 만들 수 있음.

  set fullName(value) {
    console.log(value);
  }
}

const student = new Student("수지", "김");
console.log(student.firstName);
console.log(student.fullName);
student.fullName = "김철수";
console.log(student.fullName);

student.fullName = "김철수";
