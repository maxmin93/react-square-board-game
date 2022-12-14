# React Tutorial : [Square Board Game (TicTacTok)](https://reactjs.org/tutorial/tutorial.html#inspecting-the-starter-code)

'틱택톡' 보드게임 튜토리얼을 Functional Component(함수형 컴포넌트)로 구현

- 공식문서에는 클래스형 컴포넌트로 설명하고 있음
- 깃허브 또는 검색 결과에는 Board 컴포넌트가 클래스형으로 기술된 것들뿐
- [리액트 공부 1-Day](https://taejoone.jeju.onl/posts/2022-11-21-react-tutorial-day1/) 과제

## 1. 설정

최신 버전의 create-react-app 을 사용하려면 global 설치하지 말것! (알아서 불러온다)

```bash
# react: "^18.2.0"
$ yarn create react-app square-board-game

$ cd square-board-game

$ yarn start  # ==> http://localhost:3000

$ yarn build  # ==> build 디렉토리에 배포버전 생성
```

## 2. 코딩

### 1) 파일 구성

- `board-game`
  - package.json
  - public
    - index.html : `<div id="root"></div>` 포함
    - favicon.ico 등.. assets 파일들
  - src
    - index.js : `#root` 에 ReactDOM 생성 (건드릴 부분 없음)
    - index.css : 전체에 영향을 미치는 스타일 정의
    - App.js : root 컴포넌트
    - App.css : root 컴포넌트를 위한 스타일 정의
    - Game.js : v2 에서 사용되는 게임 상태 클래스를 정의

### 2) 컴포넌트 구성

#### App (Game) 컴포넌트

- 보드의 상태 정보를 생성하고 관리
- 현재 상태 또는 종료시 승리자를 출력

#### Board 컴포넌트

- 플레이어의 클릭 이벤트와 차례를 제어
- 이미 마킹된 경우 변경 없음

#### Square 컴포넌트

- 최초 상태는 공백
- 클릭된 경우 마킹된 표식을 출력 (X 또는 O)

### 3) 로직

#### 전체 흐름

1. 최초 X 플레이어부터 시작 (다음은 O 플레이어)
2. 9개의 셀에 중에 임의의 위치를 클릭하여 자신의 표식을 마킹
3. 이미 마킹된 셀의 표식은 변경할 수 없음
4. 9개의 셀이 모두 마킹되면, 승리자를 계산
5. 승리자를 게임 정보에 출력

#### Winner 판정 : checkWinner 함수

승리하는 모든 경우의 조합 8가지에 대해, 동일한 player 마킹이 있는지 확인

## 3. 구현 버전

### 1) Board 에 게임 상태가 저장되는 형태

함수형 컴포넌트가 제각각 출력할 항목과 상태를 관리하는 형태

> 게임의 상태값과 변경 로직이 흩어져 있는 형태. 헷갈린다.

- Board 의 상태값으로 Square 마킹 출력
- Board 에서 onClick 함수로 게임의 상태 변경을 처리
- App 에서는 info 출력만 관리

![TicTacToe ver1 Capture](/assets/react-tictactoe-ver1.png){: width="600"}

### 2) Game 클래스에 게임 상태가 저장되는 형태

흩어진 상태값과 로직을 모두 모아서 Game 클래스로 구성

> 리액트 컴포넌트는 렌더링에만 집중하도록 하여 코드가 단순해졌다.

- Game Class 에서 모든 상태값을 관리
  - Game 인스턴스는 index.js 에서 생성하고 App 컴포넌트에 전달
- App 에서는 Game 의 상태 변경(handleClick)에 대한 로직만 처리
- Board 는 Square 의 위치 바인딩과 함수 전달자 역활만 수행
  - onClick 함수의 파라미터 i 값을 바인딩

![TicTacToe ver2 Capture](/assets/react-tictactoe-ver2.png){: width="600"}

### 3) History 이용해 이전 스텝으로 이동하는 기능 추가

스텝 버튼 생성을 위한 문자열은 컴포넌트 내에서 생성해야 함

- Game 클래스에서 label 문자열을 만들어 태그를 생성하는데 실패
- 렌더링 되는 대상은 컴포넌트에서 생성되도록 하는게 옳다
  - key 를 부여해도 `li` 가 최종 label 하나만 생성됨

![TicTacToe ver3 Capture](/assets/react-tictactoe-ver3-signed.png){: width="600"}

## 4. 핵심 포인트

### 0) [React Without JSX](https://reactjs.org/docs/react-without-jsx.html)

확장명을 JSX 로 설정할 필요가 없다. JS 가 더 편리해졌음.

```js
// index.js
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App game={new Game()} />
  </React.StrictMode>
);
```

### 1) 함수형 컴포넌트 스타일

- 클래스형 컴포넌트보다 코드가 적어지고 단순해진다.
- 대신 Hook 함수를 적절히 잘 써야함
- 함수형 컴포넌트의 파라미터는 `props` 로 묶어서 처리하기도 한다.

#### 함수 바인딩

- 함수에 파라미터가 있는 경우, 바인딩 되는 시점을 잘 확인해야 함
  - 처음에 square 의 포지션 i 값이 어디서 주어지는 것인지 어리둥절 했음

### 2) useState

- 변수와 변경함수가 셋트로 정의된다.
- 컴포넌트가 useState 를 사용하면, 변경에 대한 관리도 컴포넌트 내부에서 해야 함

### 3) useEffect

- useEffect 는 두번식 호출되는 경우가 잦다. (마운트, 언마운트)
  - 이 Hook 함수로 누적 카운팅 같은 작업은 하지 말것!

### 4) 기타 등등

#### `ol.li` 에서 `li` 에 `key` 가 반드시 있어야 한다

- Warning 메시지

```text
Warning: Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.%s

Check the render method of `App`.
    at li
    at App (http://localhost:3000/main.007abd1a64e12d268dc1.hot-update.js:107:5)
```

- 해결

```js
const steps = Array.from(Array(game.step + 1).keys());
const listItems = steps.map((index) => {
  return (
    <li key={index}>
      <button onClick={() => gotoStep(index)}>
        go to {index ? "step#" + index : "HEAD"}
      </button>
    </li>
  );
});
```

## 5. 배포

### 1) package.json

```json
{
  "name": "square-board-game",
  "homepage": "/board-game",
  "version": "0.1.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "deploy": "sudo rm -rf /var/www/react/board-game/* && sudo cp -r build/* /var/www/react/board-game/",
    "reload": "sudo systemctl reload nginx.service"
  }
}
```

### 2) nginx.conf

```text
  # Settings for a TLS enabled server.
  server {
    include /etc/nginx/default.d/*.conf;

    autoindex off;
    location / {
      root        /usr/share/nginx/html;
      index       index.html;
    }

    error_page 404 /404.html;
    location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
    }

    location /robots.txt {
      return 200 "User-agent: *\nDisallow: /\n";
    }

    location /board-game {
      alias /var/www/react/board-game;
      try_files $uri $uri/ $uri/index.html;
    }
  }
```

## 9. Summary

- React 는 정말 렌더링만 처리한다.
- DOM 계층이 깊어지거나 복잡해지면 데이터와 로직 관리가 어려울듯
  - 상태관리 라이브러리가 필수!
  - [Recoil](https://recoiljs.org/docs/introduction/getting-started) 을 공부해보자!
