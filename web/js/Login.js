document.addEventListener("DOMContentLoaded", function() {

  const config = {
    API_URL : '',
    API_KEY : '',
  }

  const kakaologinbtn = document.querySelector('#kakao-login-btn');
  // 카카오 로그인 버튼 클릭 시
kakaologinbtn.addEventListener('click', () => {
  const url = 'http://52.63.140.248/api/oauth/kakao';
  this.location.assign(url);
  // window.location.href = url;
  // console.log(window.location.href);
});
console.log(window.location.href);
// 페이지 로딩 완료 시
window.addEventListener('load', () => {
  // 현재 URL의 쿼리 파라미터를 추출
  console.log("Hi");
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('accessToken');

  // 추출한 accessToken을 활용하여 다른 작업을 수행
  if (accessToken) {
    // 여기에 추출한 accessToken을 이용한 로직을 추가
    console.log("추출한 accessToken:", accessToken);
  }
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
       
        console.log('Login successful:', data); localStorage.setItem('Refresh-Token', data.data.refreshToken);
        window.location.href = 'http://52.63.140.248/web/html/Main.html';
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
