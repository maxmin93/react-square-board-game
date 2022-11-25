# React Tutorial : [Square Board Game (TicTacTok)](https://reactjs.org/tutorial/tutorial.html#inspecting-the-starter-code)

'틱택톡' 보드게임 튜토리얼을 Functional Component(함수형 컴포넌트)로 구현

- 공식문서에는 클래스형 컴포넌트로 설명하고 있음
- 깃허브 또는 검색 결과에는 Board 컴포넌트가 클래스형으로 기술된 것들뿐
- 리액트 공부 1-Day 과제

## 1. 설정

```bash
$ yarn create react-app board-game
$ cd board-game

$ yarn start

$ yarn build
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

#### Winner 판정 : calculateWinner 함수

## 3. 구현 버전

### 1) Board 에 게임 상태가 저장되는 형태

- Board 의 상태값으로 Square 마킹 출력

### 2) Game(App) 에 게임 상태가 저장되는 형태

- Game 의 상태값으로 Square 마킹 출력
- Board 는 게임 자체의 제약과 전달자 역활만 수행

## 4. 실행

## 9. Summary
