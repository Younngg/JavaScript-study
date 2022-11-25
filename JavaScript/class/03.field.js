// 접근제어자 - 캡슐화
// private(#), public(기본), protected

class Fruit {
  #name;
  #emoji;
  type = "과일"; // 클래스가 만들어지자마자 초기화가 미리 되어있음
  constructor(name, emoji) {
    this.#name = name;
    this.#emoji = emoji;
  }
  display = () => {
    console.log(`${this.#name}: ${this.#emoji}`);
  };
}

const apple = new Fruit("apple", "🍎");

console.log(apple);
console.log(apple.display());
