// Login.js
import config from '../config.json';

function loginWithKakao() {
  var redirectUri = config.API_URL;

  Kakao.Auth.authorize({
    redirectUri: redirectUri,
  });
}
document.addEventListener("DOMContentLoaded", function() {
  // 페이지가 로드되고 준비된 후 실행되어야 하는 코드
  Kakao.init(config.API_KEY); // 사용하려는 앱의 JavaScript 키 입력
  displayToken()
  function displayToken() {
    var token = getCookie('authorize-access-token');

    if(token) {
      Kakao.Auth.setAccessToken(token);
      Kakao.Auth.getStatusInfo()
        .then(function(res) {
          if (res.status === 'connected') {
            document.getElementById('token-result').innerText
              = 'login success, token: ' + Kakao.Auth.getAccessToken();
          }
        })
        .catch(function(err) {
          Kakao.Auth.setAccessToken(null);
        });
    }
  }
  function getCookie(name) {
    var parts = document.cookie.split(name + '=');
    if (parts.length === 2) { return parts[1].split(';')[0]; }
  }

});
// 폼 제출(submit) 이벤트 리스너 등록
const form = document.querySelector('.loginform');
form.addEventListener('submit', handleLogin);

// 로그인 폼 제출(submit) 이벤트 핸들러
function handleLogin(event) {
  event.preventDefault(); // 폼 제출 기본 동작을 막습니다.

  // 사용자가 입력한 아이디와 비밀번호를 가져옵니다.
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  // 폼 데이터를 JSON 형식으로 변환
  const formData = { username, password };

  // 서버로 로그인 정보를 POST로 전송
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    // 응답 처리
    if (response.ok) {
      // 로그인 성공
      return response.json();
    } else {
      // 로그인 실패
      throw new Error('로그인에 실패하였습니다.');
    }
  })
  .then(data => {
    // 서버로부터 받은 응답 데이터 처리
    alert(data.message); // 예시: 서버로부터 받은 메시지를 알림창으로 표시
  })
  .catch(error => {
    // 에러 처리
    alert(error.message); // 예시: 에러 메시지를 알림창으로 표시
  });
}
