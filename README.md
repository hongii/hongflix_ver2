# HONGFLIX:blush:

보고싶은 영화를 검색하고 영화 예고편 및 영화 정보를 볼 수 있는 영화 검색 사이트(넷플릭스 클론코딩)


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

## 페이지 설명:mag:

### [로그인한 사용자가 접근 가능한 페이지]

**1. 메인 페이지(MainPage)**

<img src="https://github.com/hongii/hongflix_ver2/assets/93701887/9fac5725-a921-49c7-b342-972f2aebb662" width="50%" height="50%" alt="MainPage"></img>

- 현재 인기있는 영화 목록과 각 장르별 영화들(로맨스, 공포, 액션, 코미디 등)을 슬라이드로 넘기면서 확인할 수 있다.
- 메인화면에서 보여지는 영화를 클릭하면, 영화에 대한 상세정보를 확인할 수 있는 모달창이 보여진다.
- 검색창을 클릭하여 영화를 검색할 수 있다.
- 로그아웃 버튼을 눌러 현재 사용중인 사용자의 정보를 삭제할 수 있다.

  </br>

**2. 영화 검색 페이지(SearchPage)**

<img src="https://github.com/hongii/hongflix_ver2/assets/93701887/6fdc9f72-3c6f-4088-83fa-2cfe029a1522" width="50%" height="50%" alt="MainPage"></img>

- 메인 페이지(MainPage)의 검색창에 찾고자 하는 영화 제목을 입력할 경우, 해당 제목이 포함된 영화의 목록을 보여준다.
- 검색된 영화를 클릭하면, 영화의 상세 정보를 확인할 수 있는 모달창을 보여준다.

  </br>

**3. 영화 재생 페이지(PlayMoviePage)**

<img src="https://github.com/hongii/hongflix_ver2/assets/93701887/7e785412-afbd-4e69-a6d7-6ac59a068d2c" width="50%" height="50%" alt="MainPage"></img>

- 메인 페이지((LoginInputPage))의 배너에 있는 “재생”버튼을 클릭하거나, 모달창의 “재생”버튼을 클릭한 경우에 영화 재생 페이지로 이동하여 영화 예고편(유튜브 영상)을 전체화면으로 재생한다.

  </br>

**cf. 모달창에 보여지는 영화 상세 정보**

<img src="https://github.com/hongii/hongflix_ver2/assets/93701887/fc323008-6899-47d0-af41-9c54bcf79fb4" width="47%" height="45%" alt="MainPage"></img> <img src="https://github.com/hongii/hongflix_ver2/assets/93701887/abcd3eb6-ff95-4e36-a468-e39c207f8165" width="45%" height="45%" alt="MainPage"></img>

- 해당 영화가 재생 가능한 영상 정보를 가지고 있는 경우, 영상을 자동으로 재생시켜서 보여준다. 영상 정보를 가지고 있지 않다면, 대표 이미지를 보여준다.
- 영화 제목, 영화 개봉일, 상영시간, 영화 줄거리, 영화 평점, 영화 장르에 대한 정보를 확인할 수 있다.

</br>

### [로그인하지 않은 사용자가 접근 가능한 페이지]

**1. 메인 페이지(LoginMainPage)**

<img src="https://github.com/hongii/hongflix_ver2/assets/93701887/be18df38-1c57-40ee-a755-946ce84d748e" width="50%" height="50%" alt="MainPage"></img>

- 가입할 이메일 주소를 입력하고 “시작하기”버튼을 클릭하면 회원가입 페이지(SignUpPage)로 이동할 수 있다.
- 만약, 입력한 이메일 주소가 이미 가입된 회원 이메일 주소인 경우, 로그인 페이지(LoginInputPage)로 이동된다.
- 우측 상단 “로그인” 버튼을 클릭하여 바로 로그인 페이지(LoginInputPage)로 이동할 수도 있다.

  </br>

**2. 회원가입 페이지(SignUpPage)**

<img src="https://github.com/hongii/hongflix_ver2/assets/93701887/779b9bb8-13cf-4ec2-b81b-6a1e093bb506" width="50%" height="50%" alt="MainPage"></img>

- 유저는 이메일 주소, 사용자 이름, 비밀번호를 입력한 후 “가입하기” 버튼을 클릭하여 회원가입을 완료할 수 있다.
- 회원가입이 완료된 유저는 로그인페이지(LoginInputPage)로 이동된다.

</br>

**3. 로그인 페이지(LoginInputPage)**

<img src="https://github.com/hongii/hongflix_ver2/assets/93701887/16e8b5af-9459-4d2c-b682-1482d6ad85c9" width="50%" height="50%" alt="MainPage"></img>

- 가입된 유저 정보와 현재 유저가 입력한 유저 정보가 일치한다면 로그인에 성공하여 위에서 언급한 로그인한 사용자가 접근 가능한 페이지 중 메인 페이지(MainPage)로 이동하게 된다.

  </br>
