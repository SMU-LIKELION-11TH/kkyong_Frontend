// Register.js

const data = [
  {
    "email" : "user@gmail.com",
    "password" : "user123",
    "nickname" : "user",
    "kakao": "user",
    "phoneNumber": "01054377153",
    "region": "종로구",
    "role" : "USER"
  }
]
// 폼 제출(submit) 이벤트 리스너 등록
const form = document.querySelector('.loginform');
form.addEventListener('submit', handleSubmit);

// 폼 제출(submit) 이벤트 핸들러
function handleSubmit(event) {
  event.preventDefault(); // 폼 제출 기본 동작을 막습니다.

  // 폼 데이터 수집
  const formData = new FormData(form);
  formData.append("role", "USER");
  const formDataObj = Object.fromEntries(formData.entries());
  console.log(formDataObj);
  // 폼 데이터를 POST 요청으로 백엔드로 전송하는 로직을 작성합니다.
  // 여기서는 fetch API를 사용하여 예시로 보여드리겠습니다.
  fetch('http://52.63.140.248:8080/api/register', {
    method: 'POST',
    body: JSON.stringify(formDataObj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    // POST 요청에 대한 응답을 처리하는 로직을 작성합니다.
    console.log('응답 데이터:', data);
    const targetURL = 'http://127.0.0.1:5500/Project/html/Login.html';
    window.location.href = targetURL; // 페이지 이동
  })
  .catch(error => {
    // 에러 처리 로직을 작성합니다.
    console.error('에러 발생:', error);
  });
}
