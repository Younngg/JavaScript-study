## OOP

### OOP(Object-oriented programming)란?

- 객체 지향 프로그래밍
- 여러 개의 독립된 단위 객체들의 모임

### 특징

1. 자료 추상화 (Abstraction)

- 불필요한 정보는 숨기고 중요한 정보만을 표현함으로써 프로그램을 간단히 만드는 것

2. 상속 (Inheritance)

- 새로운 클래스가 기존 클래스의 자료와 연산을 이용할 수 있게 하는 기능
- 상속을 받는 새로운 클래스를 부클래스, 파생 클래스, 하위 클래스, 자식 클래스라고 함
- 새로운 클래스가 상속하는 기존의 클래스를 기반 클래스, 상위 클래스, 부모 클래스라고 함
- 클래스 간의 종속 관계를 형성함으로써 객체를 조직화할 수 있음

3. 다형성 (Polymorphism)

- 같은 메소드라도 각 인스턴스에 따라 다양한 형태를 가질 수 있는 것
- 객체의 변수나 메소드가 상황에 따라 다른 의미로 해석될 수 있는 것
- 오버라이딩(Overriding)을 사용하여 자식 클래스의 메소드가 부모 클래스의 메소드와 다르게 동작하거나 변수가 다른 값으로 지정될 수 있음

4. 캡슐화 (Encapsulation)

- 클래스 안에 관련 메소드, 변수 등을 하나로 묶어줌
- 바깥에서의 접근을 막아 보안이 강화되고 잘 관리되는 코드를 제공
- 더 일반적인 코드를 재사용하고 작성할 수 있음

```js
class PaymentGateway {
  constructor() {
    this.connect();
  }
  connect() {
    // ..
  }
  pay(amount) {
    // ..
  }
  refund(amount) {
    // ..
  }
}

class Paypal extends PaymentGateway {
  connect() {
    // paypal 전용 로직
  }
  pay(amount) {
    // paypal 전용 로직
  }
  refund(amount) {
    // paypal 전용 로직
  }
}

class Visa extends PaymentGateway {
  connect() {
    // visa 전용 로직
  }
  pay(amount) {
    // visa 전용 로직
  }
  refund(amount) {
    // visa 전용 로직
  }
}

class Customer {
  makePayment(gateway, amount) {
    return gateway.pay(amount);
  }

  getRefund(gateway, amount) {
    return gateway.refund(amount);
  }
}

const john = new Customer();
const paypal = new Paypal();
const visaCard = new Visa();

john.makePayment(paypal, 100);
john.makePayment(visaCard, 100);
```

- 새로운 결제 제공업체가 생길 때, client 클래스의 결제 로직을 조정하지 않고 새 클래스를 생성하기만 하면 됨
