# HONGFLIX:blush:

보고싶은 영화를 검색하고 영화 예고편 및 영화 정보를 볼 수 있는 영화 검색 사이트(넷플릭스 클론코딩)

:point_right: [Notion 정리 바로가기](https://hongii.notion.site/HONGFLIX-e545602d82fb4898b5f61d351fba9306?pvs=4)

:point_right:[배포(AWS)사이트 바로가기](http://ec2-3-35-82-214.ap-northeast-2.compute.amazonaws.com/)
<br/>

## 개인 프로젝트 진행 기간:calendar:

- 최초 제작 : 22년도 8월(1주)
- 1차 리팩토링 : 23년도 3월(2주)
- 2차 리팩토링 및 배포 : 23년도 8월(3주)
  <br/>

## 기술 스택:question:

### [Front-End]

- React.js
- Typescript
- Axios
- react-redux, redux-toolkit, redux-persist
- styled-components

### [Back-End]

- node.js (express)
- Typescript
- JWT (Json Web Token)
- Database - Docker(Postgresql)
  <br/>

## 페이지 별 기능 설명:mag:

### [로그인한 사용자가 접근 가능한 페이지]

**1. 메인 페이지(MainPage)**

<img src="https://github.com/hongii/hongflix_ver2/assets/93701887/28e5f017-4edf-4e49-86df-1a21d2e1336c" width="50%" height="50%" alt="MainPage"></img>

- 배너에는 현재 상영중인 영화를 랜덤으로 보여준다.
- 현재 인기있는 영화 목록과 각 장르별 영화들(로맨스, 공포, 액션, 코미디 등)을 슬라이드로 넘기면서 확인할 수 있다.
- 메인화면에서 보여지는 영화를 클릭하면, 영화에 대한 상세정보를 확인할 수 있는 모달창이 보여진다.
- 검색창을 클릭하여 영화를 검색할 수 있다.
- 로그아웃 버튼을 눌러 현재 사용중인 사용자의 정보를 삭제할 수 있다. 이 때, 사용자는 로그인 하지 않은 사용자가 접근 가능한 페이지 중 메인페이지(LoginMainPage)로 이동된다.
  </br>

**2. 영화 검색 페이지(SearchPage)**

<img src="https://github.com/hongii/hongflix_ver2/assets/93701887/99e53f3d-8f8c-464f-8f96-d2adfa72e6bd" width="50%" height="50%" alt="MainPage"></img>

- 메인 페이지(MainPage)의 검색창에 찾고자 하는 영화 제목을 입력할 경우, 해당 제목이 포함된 영화의 목록을 보여준다.
- 검색된 영화를 클릭하면, 영화의 상세 정보를 확인할 수 있는 모달창을 보여준다.
  </br>

**3. 영화 재생 페이지(PlayMoviePage)**

<img src="https://github.com/hongii/hongflix_ver2/assets/93701887/cf0ee83b-c912-4320-8461-af1acf7db758" width="50%" height="50%" alt="MainPage"></img>

- 메인 페이지((LoginInputPage))의 배너에 있는 “재생”버튼을 클릭하거나, 모달창의 “재생”버튼을 클릭한 경우에 영화 재생 페이지로 이동하여 영화 예고편(유튜브 영상)을 전체화면으로 재생한다.
  </br>

**cf. 모달창에 보여지는 영화 상세 정보**

<img src="https://github.com/hongii/hongflix_ver2/assets/93701887/4d2be0f9-50b4-4ab4-b838-2264247b5b64" width="50%" height="50%" alt="MainPage"></img>

- 해당 영화가 재생 가능한 영상 정보를 가지고 있는 경우, 영상을 자동으로 재생시켜서 보여준다. 이 때, “재생”버튼을 누르면 해당 영화를 재생하는 영화 재생 페이지로 이동한다.
- 만약 영상 정보를 가지고 있지 않다면, 대표 이미지를 보여준다.
- 영화 제목, 영화 개봉일, 상영시간, 영화 줄거리, 영화 평점, 영화 장르에 대한 정보를 확인할 수 있다.

</br>

### [로그인하지 않은 사용자가 접근 가능한 페이지]

**1. 메인 페이지(LoginMainPage)**

<img src="https://github.com/hongii/hongflix_ver2/assets/93701887/a4245265-c53e-47ee-9f06-865d3af6e0a5" width="50%" height="50%" alt="MainPage"></img>

- 가입할 이메일 주소를 입력하고 “시작하기”버튼을 클릭하면 회원가입 페이지(SignUpPage)로 이동할 수 있다.
- 만약, 입력한 이메일 주소가 이미 가입된 회원 이메일 주소인 경우, 로그인 페이지(LoginInputPage)로 이동된다.
- 우측 상단 “로그인” 버튼을 클릭하여 바로 로그인 페이지(LoginInputPage)로 이동할 수도 있다.

  </br>

**2. 로그인 페이지(LoginInputPage)**

<img src="https://github.com/hongii/hongflix_ver2/assets/93701887/1465da9f-a1f7-4c6b-847f-cbde27e6b349" width="50%" height="50%" alt="MainPage"></img>

- 회원가입을 완료한 유저는 자동으로 로그인 페이지로 이동된다.
- 또는 메인 페이지(LoginMainPage)에서 “로그인”버튼을 클릭하거나 이미 가입된 이메일 주소를 입력한 경우에도 로그인 페이지로 이동된다.
- 가입된 유저 정보와 현재 유저가 입력한 유저 정보가 일치한다면 로그인에 성공하여 위에서 언급한 로그인한 사용자가 접근 가능한 페이지 중 메인 페이지(MainPage)로 이동하게 된다.
  </br>

**3. 회원가입 페이지(SignUpPage)**

<img src="https://github.com/hongii/hongflix_ver2/assets/93701887/0d3a6113-9891-4a82-971f-f979130b910e" width="50%" height="50%" alt="MainPage"></img>

- 메인페이지(LoginMainPage)에서 아직 가입되지 않은 이메일 주소를 입력할 경우, 회원가입 페이지로 이동된다.
- 유저는 이메일 주소, 사용자 이름, 비밀번호를 입력한 후 “가입하기” 버튼을 클릭하여 회원가입을 완료할 수 있다.
- 회원가입이 완료된 유저는 로그인페이지(LoginInputPage)로 이동된다.
