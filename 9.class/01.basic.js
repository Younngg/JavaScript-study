// Class

// 객체를 생성할 수 있는 템플릿(청사진, 틀)
// 생성자 함수 보다는 클래스를 이용
// 객체지향 프로그래밍
// 프로토타입보다 사용하기 간편함

// 클래스로 만들어진 객체를 인스턴스instance라고 함

// 객체를 손쉽게 만들 수 있는 템플릿
// 1. 생성자 함수 (오래된 고전적인 방법)
// 2. 클래스

class Fruit {
  // 생성자: new 키워드로 객체를 생성할 때 호출되는 함수
  constructor(name, emoji) {
    this.name = name;
    this.emoji = emoji;
  }
  // 함수는 보통 생성자 밖에 정의함
  display = () => {
    console.log(`${this.name}: ${this.emoji}`);
  };
}

// apple, orange는 Fruit 클래스의 인스턴스이다.
const apple = new Fruit("apple", "🍎");
const orange = new Fruit("orange", "🍊");

console.log(apple);
console.log(orange);

// obj는 객체이고, 그 어떤 클래스의 인스턴스도 아니다.
const obj = { name: "young" };
