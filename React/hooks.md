## Hooks 개요

### Hook이란?

컴포넌트에서 데이터를 관리하고 데이터가 변경될 때 상호작용을 하기 위해 사용

함수컴포넌트에서도 state와 생명주기를 관리하고, 복잡한 클래스 컴포넌트를 보완하기 위해 react 16.8에 도입

Hook은 React함수 내에서만 사용 가능

Hook의 이름은 반드시 use로 시작 (커스텀 훅을 만들 때)

최상위 level에서만 Hook을 호출할 수 있다. (if문, for문, 또는 콜백함수 내에서 호출 x)

## State Hook과 Effect Hook

### state hook

```jsx
const App = () => {
  const [state이름, setState이름] = useState(초기값);
};
```

- useState는 컴포넌트 내 동적인 데이터를 관리할 수 있는 hook
- 최초 호출시 초기값으로 설정되며 재렌더링 될 경우 무시됨
- state는 읽기 전용이고, 변경하려면 setState 사용
- 변경시 자동으로 컴포넌트가 재렌더링

- setState함수에 직접 값을 입력하거나 현재 값을 매개변수로 받는 함수를 전달

### Effect hook

```jsx
const App = () => {
	useEffect(effectCallback, Deps?)
}
```

- Effect hook 사용하면 함수 컴포넌트에서 side effect를 수행할 수 있다.
- 컴포넌트가 최초로 렌더링 될 때, 지정한 state나 prop이 변경될 때마다 이펙트 콜백 함수가 호출된다.
- Deps : 변경을 감지할 변수들의 집합(배열)
- effectCallback : Deps에 지정된 변수가 변경될 때 실행할 함수

```jsx
const App = () => {
  useEffect(() => {
    //state가 변경될 때, 컴포넌트를 렌더링 할 때
    const intervalid = setInterval(() => {
      console.log('안녕하세요');
    }, 1000);

    //컴포넌트를 재렌더링 하기 전에, 컴포넌트가 없어질 때
    return () => {
      clearInterval(intervalid);
    };
  }, []);
};
```

- deps가 빈 배열이면 컴포넌트 생성시 한번만 실행해달라는 뜻
- useEffect의 이펙트 함수 내에서 다른 함수를 return할 경우 state가 변경되어 컴포넌트가 다시 렌더링되기 전과 컴포넌트가 없어질 때(destroy) 호출할 함수를 지정하게 됨

### 이외의 Hooks

**useMemo**

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- 지정한 state나 props가 변경될 경우 해당 값을 활용해 계산된 값을 메모이제이션하여 재렌더링시 불필요한 연산을 줄인다.
- useMemo의 연산은 렌더링 단계에서 이뤄지기 때문에 시간이 오래 걸리는 로직을 작성하지 않는 것이 권장

**useCallback**

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

- 함수를 메모이제이션하기 위해 사용
- 재렌더링시 불필요하게 함수가 다시 생성되는 것을 방지

**useRef**

```jsx
const refContainer = useRef(initialValue);
```

- 컴포넌트 생애 주기 내에서 유지할 ref 객체를 반환
- ref객체는 .current라는 프로퍼티를 가지며 이 값을 자유롭게 변경 가능
- 일반적으로 DOM element에 접근할 때 사용
- ref가 변경되어도 재렌더링 되지 않음

## 나만의 hook 만들기

### custom hook

UI의 재사용성을 올리기 위해 컴포넌트를 만드는 것처럼 로직의 재사용성을 높이기 위해 custom hook을 제작함

한 hook 내의 state는 공유되지 않는다
