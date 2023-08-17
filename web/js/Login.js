document.addEventListener("DOMContentLoaded", function() {

  const config = {
    API_URL : '',
    API_KEY : '',
  }

  const kakaologinbtn = document.querySelector('#kakao-login-btn');

  fetch('../config.json')
    .then(response => (response.json()))
    .then(data => {
      console.log(data);
      config.API_KEY = data.API_KEY;
      config.API_URL = data.API_URL;
      Kakao.init(config.API_KEY); // 사용하려는 앱의 JavaScript 키 입력
      displayToken();

      // 카카오톡 버튼에 클릭 이벤트 리스너 추가
      kakaologinbtn.addEventListener('click', () => {
        const url = `http://52.63.140.248:8080/api/oauth/kakao`;
        window.location.href = url;

      });
    });

  // function loginWithKakao() {
  //   var redirectUri = config.API_URL;

  //   Kakao.Auth.authorize({
  //     redirectUri: redirectUri,
  //   });
  // }

  // function displayToken() {
  //   var token = getCookie('authorize-access-token');

  //   if(token) {
  //     Kakao.Auth.setAccessToken(token);
  //     Kakao.Auth.getStatusInfo()
  //       .then(function(res) {
  //         if (res.status === 'connected') {
  //           document.getElementById('token-result').innerText
  //             = 'login success, token: ' + Kakao.Auth.getAccessToken();
  //         }
  //       })
  //       .catch(function(err) {
  //         Kakao.Auth.setAccessToken(null);
  //       });
  //   }
  // }

  // function getCookie(name) {
  //   var parts = document.cookie.split(name + '=');
  //   if (parts.length === 2) { return parts[1].split(';')[0]; }
  // }

});
const form = document.querySelector('.loginform');
form.addEventListener('submit', handleLogin);

function handleLogin(event) {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const formData = {
    email: username,
    password: password
  };

  fetch('http://52.63.140.248:8080/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.data.accessToken && data.data.refreshToken) {
        localStorage.setItem('Access-Token', data.data.accessToken);
        localStorage.setItem('Refresh-Token', data.data.refreshToken);
        console.log('Login successful:', data);
        window.location.href = 'http://127.0.0.1:5500/web/html/Main.html';
        // 성공했을 때 원하는 페이지로 이동
      } else {
        console.log(data.accessToken);
        console.log('Login failed:', data);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error occurred.');
    });
}
