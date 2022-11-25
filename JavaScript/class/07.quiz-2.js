// 정직원과 파트타임 직원을 나타낼 수 있는 클래스
// 직원 정보 : 이름, 부서 이름, 한달 근무 시간
// 매달 직원들의 정보를 이용해서 한달 월급 계산 가능
// 정직원 시간당 10000원
// 파트타임 시간당 8000원

class Employee {
  constructor(name, department, hours, pay) {
    this.name = name;
    this.department = department;
    this.hours = hours;
    this.pay = pay;
  }

  caculatePay() {
    return this.hours * this.pay;
  }
}

class FullTimeEmployee extends Employee {
  static HOURS_PAY = 10000;
  constructor(name, department, hours) {
    super(name, department, hours, FullTimeEmployee.HOURS_PAY);
  }
}
class PartTimeEmployee extends Employee {
  static HOURS_PAY = 8000;
  constructor(name, department, hours) {
    super(name, department, hours, FullTimeEmployee.HOURS_PAY);
  }
}
const young = new FullTimeEmployee("영", "부서", 8);
console.log(young.caculatePay());
