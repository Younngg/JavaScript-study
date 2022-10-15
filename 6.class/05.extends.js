/* class Tiger {
  constructor(color) {
    this.color = color;
  }
  eat() {
    console.log("먹자!");
  }
  sleep() {
    console.log("작다");
  }
} */

/* class Dog {
  constructor(color) {
    this.color = color;
  }
  eat() {
    console.log("먹자!");
  }
  sleep() {
    console.log("작다");
  }
  play() {
    console.log("놀자아");
  }
} */

class Animal {
  constructor(color) {
    this.color = color;
  }
  eat() {
    console.log("먹자!");
  }
  sleep() {
    console.log("작다");
  }
}

class Tiger extends Animal {}
const tiger = new Tiger("노랑이");

class Dog extends Animal {
  constructor(color, ownerName) {
    // animal의 constructor 모두 가져와야함
    super(color); //상속하는 부모에게서 가져옴
    this.ownerName = ownerName;
  }
  play() {
    console.log("놀자아~!");
  }

  eat() {
    // 덮어씌우기 가능 (오버라이딩 overriding)
    super.eat(); // 부모의 eat 메서드 가져올 수 있음
    console.log("강아지가 먹는다!");
  }
}

const dog = new Dog("빨강이", "엘리");
console.log(dog);
dog.sleep();
dog.eat();
dog.play();
