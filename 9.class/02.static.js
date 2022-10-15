// 재사용성을 높이는 방법
// 클래스 레벨의 프로퍼티와 메서드를 사용하면 됨
// static이라는 키워드를 프로퍼티나 메소드 앞에 붙이면 인스턴스에 포함되지 않고, 클래스에 한번만 만들어짐

// 호출할 때도 클래스이름.메서드()

// static 정적 프로퍼티, 메서드
class Fruit {
  static MAX_FRUITS = 4;
  constructor(name, emoji) {
    this.name = name;
    this.emoji = emoji;
  }
  // 클래스 레벨의 메서드
  static makeRandomFruit() {
    // 클래스 레벨의 메서드에서는 this를 참조할 수 없음.
    // 클래스 자체로는 아무것도 채워지지 않은 템플릿 상태이기 때문
    return new Fruit("banana", "🍌");
  }

  // 인스턴스 레벨의 메서드
  display = () => {
    console.log(`${this.name}: ${this.emoji}`);
  };
}

const banana = Fruit.makeRandomFruit();
console.log(banana);
console.log(Fruit.MAX_FRUITS);
// apple, orange는 Fruit 클래스의 인스턴스이다.
const apple = new Fruit("apple", "🍎");
const orange = new Fruit("orange", "🍊");

console.log(apple);
console.log(orange);
