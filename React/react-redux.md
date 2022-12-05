## Redux

- 앱 전체 상태를 쉽게 관리하기 위한 라이브러리
- Redux의 많은 개념들이 Flux pattern에서 차용됨
- 주로 react 앱과 같이 사용
- [redux.js.org](http://redux.js.org)

- 앱 전체 상태 관리가 필요할 때
- 복잡한 비동기 처리가 있는 상태 관리가 필요할 때
  - redux-thunk
  - redux-saga
  - redux-observable
- 앱의 상태가 복잡하고 이를 체계적으로 관리하고 싶을 때
- 상태 관리 패턴을 도입하여, 여러 개발자와 협업하고 싶을 때
- logger, devtool 등을 활용하여 상태를 관리할 필요가 있을 때

### 핵심 원칙

- Single source of truth - Store는 단 하나이며, 모든 앱의 상태는 이곳에 보관됨
- Immutability - 상태는 읽기 전용. 변경하려면 모든 상태를 변경해야 함
- Pure function - 상태의 변경은 어떠한 사이드 이펙트도 만들지 않아야 함

### Action

```jsx
const action = {
  type: 'namespace/getMyData',
  payload: {
    id: 123,
  },
};
```

- Action은 상태의 변경을 나타내는 개념 : aciton 하나만으로 특정 상태의 변경을 나타낼 수 있어야 함
- 잘게 쪼개서 작은 상태의 변경을 나타내는 게 복합적인 상태를 만드는데에 더 유용
- 어떤 형태든지 상관없으나 주로 type, payload를 포함하는 객체

### Action Creator

```jsx
const addObj = (id) => ({
  type: 'namespace/getMyData',
  payload: {
    id: String(id).slice(1),
  },
});
```

- action을 생성하는 함수
- 직접 action을 생성하는 것보다 action creator를 활용하면 재사용성이 좋고, 하나의 레이어를 추가할 수 있음.

### Store

```jsx
const store = createStore(reducer, initialState);
```

- 앱 전체의 상태를 보관
- action에 따라 reducer에서는 새로운 상태를 만들어내며, Store는 그 상태를 저장
- store의 상태는 불변하며, 매 액션이 발생할 때마다 새로운 객체가 만들어짐

### Reducer

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'namespace/getMyData':
      const obj = { id: action.payload.id };
      return { ...state, obj };
    default:
      return state;
  }
};
```

- Action을 받아 새로운 state를 만듦
- (state, action) ⇒ state의 인터페이스를 따름
- 상태 변경 시 사이드 이펙트가 없어야 함
  - console.log나 비동기 api 요청 등…
    - action를 reducer에 보내기 전에 그 결과를 action에 넣어서 보내줘야 함

### Dispatch

```jsx
function MyApp() {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(add(1234))}>submit</button>;
}
```

- action을 redux로 보내는 함수
- dispatch 후에 action은 middleware를 거쳐 reducer에 도달

### Selector

```jsx
function MyApp() {
  const obj = useSelector((state) => state.obj);
  return <div>{JSON.stringify(obj)}</div>;
}
```

- 특정 state 조각을 store로부터 가져오는 함수
- store의 state는 raw data를 저장하고, 계산된 값 등을 selector로 가져오는 등의 패턴을 구사할 때 유용 (데이터를 얻어올 때 로직을 넣어주는)

## 구조

- redux는 middleware, enhancer 등을 이용하여 자유롭게 확장할 수 있음

### middleware

- action은 dispatch 이후 모든 middleware를 먼저 통과한 후에 reducer에 도달
- redux-thunk, redux-logger 등의 라이브러리를 적용

### enhancer

- redux devtools 등의 라이브러리를 적용

### redux의 구조

![](https://camo.githubusercontent.com/dffde3f00b31582d3dd8c8e7f1b307cf7a237e5dbda312871ad9f8bc139528cc/68747470733a2f2f66616365626f6f6b2e6769746875622e696f2f666c75782f696d672f6f766572766965772f666c75782d73696d706c652d66382d6469616772616d2d6578706c61696e65642d31333030772e706e67)

- middleware에서는 사이드이펙트 가능

## redux-toolkit

- redux helper 라이브러리
- 기존에 만들어야 하는 수많은 보일러 플레이트 제거, 유용한 라이브러리를 포함하여 쉽게 작성할 수 있음
- redux-devtools, immerjs, redux-thunk, reselect 등이 미리 포함됨

### redux-toolkit API - configureStore

```jsx
const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
```

- redux의 createStore 함수를 래핑
- named parameter로 쉽게 store를 생성
  - 객체를 넘기되, 객체의 필드가 이름을 갖고 있음
- reducer - 객체를 받아 combineReducers를 적용

### createAction

```jsx
const addPost = createAction('post/addPost');

addPost({ title: 'post 1' });
```

- action creator를 만드는 고차 함수
- 만들어진 action creator에 데이터를 넘기면 payload 필드로 들어감
- 생성된 action creator는 toString() 메서드를 오버라이드해, 자신이 생성하는 액션의 타입 String을 리턴

### createReducer

```jsx
const postsReducer = createReducer(initState, (builder) => {
  builder.addCase(addPost, (state, action) => {
    state.posts.push(action.payload);
  });
});
```

- reducer를 만듦
- builder의 addCase 메서드를 이용, action마다 state의 변경을 정의
- immerjs를 내부적으로 사용하므로 mutable code를 이용해 간편하게 변경 코드 작성

### createSlice

```jsx
const toDos = createSlice({
  name: 'toDosReducer',
  initialState: JSON.parse(localStorage.getItem('toDos')) || [],
  reducers: {
    add: (state, action) => {
      const newToDo = { text: action.payload.text, id: action.payload.id };
      state.unshift(newToDo);
    },
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});
```

- Slice는 action creator, reducer 등 별도로 만들어야 하는 여러 redux 구현체를 하나의 객체로 모은 것
- createSlice 함수를 이용하여 많은 보일러플레이트를 없앨 수 있음

### createSelector

```jsx
const postSelector = (state) => state.posts;

const userSelector = (state) => state.user;

const postsByUserIdSelector = createSelector(
  postsSelector,
  userSelector,
  (posts, user) => posts.filter(posts.username === user.username)
);
```

- state를 이용한 특정 데이터를 리턴하도록 함
- 내부적으로 데이터를 캐시하며, 데이터가 변동이 없다면 캐시된 데이터를 리턴함.

## react-redux

### react-redux API - Provider

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

- redux store를 react와 연결하기 위해서는 반드시 provider로 컴포넌트를 감싸야 함
- provider 안에서 렌더링 된 컴포넌트들은 state에 접근 가능

### useDispatch

```jsx
const Detail = () => {
  const dispatch = useDispatch();

  const onBtnClick = () => {
    dispatch(remove(id));
    navigate('/');
  };

  return (
    <>
      <h1>{toDo?.text}</h1>
      <p>Created at : {toDo?.id}</p>
      <button onClick={onBtnClick}>DEL</button>
    </>
  );
};
```

- dispatch로 action creator가 생성한 action을 보내면 redux 내부로 보내짐

### useSelector

```jsx
const Home = () => {
  const toDos = useSelector((state) => state);
  return (
    <>
      <h1>To Do</h1>
      <ul>
        {toDos.map((todo) => {
          return (
            <ToDo
              key={todo.id}
              text={todo.text}
              id={todo.id}
              onBtnClick={onDeleteBtnClick}
            />
          );
        })}
      </ul>
    </>
  );
};
```

- redux store로부터 데이터를 얻기 위한 api
- selector function은 데이터에 어떤 변경을 가하면 안 됨
- 데이터를 특정 형태로 계산하여 읽을 수 있음

## Redux 비동기 처리

- 비동기 middleware를 추가해야 함
- redux-thunk는 Promise를 이용한 비동기 action을 쉽게 처리하도록 하는 middleware
  - redux-saga(saga pattern), redux-observable(rxjs)도 있음

### createAsyncThunk

- 함수를 리턴
- fulfilled, rejected, pending 3가지 상태에 대해 각각 reducer 작성
- typescript 환경에서 reducer 작성시, builder callback을 사용하여 작성해야 정확한 타이핑 가능

```jsx
const addPost = createAsyncThunk('posts/addPost', async (title) => {
  const result = await PostAPI.addPost({ title });
  return result.data;
});

//component
useEffect(() => {
  dispatch(addPost('post 1'));
}, []);
```

- 두 인자 action type, async callback(payload creator)를 받음
- action type이 주어지면, pending, fulfilled, rejected가 각각 postfix로 붙어 reducer로 들어옴
  - ex) posts/addPost/pending
- createAsyncThunk로 만들어진 action creator는 4가지 함수로 구성
  - addPost - async 함수를 dispatch하는 함수
  - addPost.pending - promise를 생성했을 때 발생하는 액션
  - addPost.fulfilled - promise가 fulfilled 됐을 때 발생
  - addPost.rejected - promise가 rejected 됐을 때 발생

```jsx
const postsSlice = createSlice({
  //...
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {...})
      .addCase(addPost.fulfilled, (state) => {...})
      .addCase(addPost.rejected, (state) => {...});
  },
});
```

- createSlice의 extraReducers 함수를 이용해 builder에 각 상황에 대한 리듀서 추가
- 공식적으로 builder pattern을 추천, 타입스크립트에서 타이핑이 용이하기 때문

- fulfilled시 데이터는 payload로 들어옴
  - ex) action.payload.todos
- rejected시 에러는 action.error로 들어오며, payload는 undefined

### 연속적인 비동기 처리

```jsx
dispatch(addPost('post1')).then(() => dispatch(updatePost('post2')));
```

- thunk 함수를 dispatch하면 promise가 리턴
- 따라서 .then() 메서드로 연속적인 비동기처리를 이어 실행

### 동시 비동기 처리

```jsx
Promise.all([
	dispatch(addPost("post1"))
	dispatch(updatePost("post2"))
])
	.then(() => console.log("Done"))
```

- Promise.all을 이용해 여러 비동기 처리를 동시 실행
- 주의할 점은 thunk의 promise가 rejected되어도 .then()으로 들어온다는 것
