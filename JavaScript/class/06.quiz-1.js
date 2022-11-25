// 카운터를 만들기
// 0 이상의 값으로 초기화 한 뒤 하나씩 숫자를 증가할 수 있는 카운터를 만들기

class Counter {
  #num;
  constructor(num) {
    if (num >= 0) {
      this.#num = num;
    } else {
      this.#num = 0;
    }
  }
  increment() {
    this.#num++;
  }
  get value() {
    return this.#num;
  }
}

const count = new Counter(-1);
count.increment();
count.increment();
console.log(count.value);
