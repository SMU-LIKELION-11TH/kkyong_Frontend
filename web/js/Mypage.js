// main.js
const accessToken = localStorage.getItem("Access-Token");
const headers = new Headers({
  Authorization: `Bearer ${accessToken}`,
});

const links = document.querySelectorAll(".bottomnav a");
const whiteIcons = [
  "whitehome.png",
  "whitefavorite.png",
  "whitereservation.png",
  "whitemypage.png",
];
const blackIcons = [
  "blackhome.png",
  "blackfavorite.png",
  "blackreservation.png",
  "blackmypage.png",
];

window.onload = () => {
  apiUserGet()
}
// 이전에 클릭한 아이콘의 인덱스를 localStorage에서 가져와서 해당 아이콘을 검정색으로 변경
const prevClickedIndex = localStorage.getItem("prevClickedIndex");
if (prevClickedIndex !== null) {
  links[prevClickedIndex].querySelector("img").src =
    "../images/" + blackIcons[prevClickedIndex];
  links[prevClickedIndex].querySelector("p").style.color = "black";
}

links.forEach((link, index) => {
  link.addEventListener("click", (event) => {
    // 이전에 클릭한 아이콘을 하얀색으로 변경
    if (prevClickedIndex !== null) {
      links[prevClickedIndex].querySelector("img").src =
        "../images/" + whiteIcons[prevClickedIndex];
      links[prevClickedIndex].querySelector("p").style.color = "white";
    }

    // 클릭한 아이콘을 검정색으로 변경
    const img = link.querySelector("img");
    img.src = "../images/" + blackIcons[index];

    // 클릭한 아이콘의 인덱스를 localStorage에 저장
    localStorage.setItem("prevClickedIndex", index);
  });
});

//토글로 화면전환
function toggleContainer(displayElement, hiddenElement) {
  hiddenElement.style.display = "none";
  displayElement.classList.add("active");
}
function apiUserGet() {
  const config = {
    method: "GET",
    headers: headers,
  };

  fetch("http://52.63.140.248:8080/api/user", config)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      userUpdate(data.data);
    })
    .catch((error) => {
      console.error("에러 발생:", error);
    });
}
// 업데이트
function userUpdate(data) {
  console.log("hi");
  const email = document.querySelector(".user-id");
  const name = document.querySelector(".user-name");
  const phonenum = document.querySelector(".user-phonenum");
  const area = document.querySelector(".user-area");

  email.innerHTML = data.email;
  name.innerHTML = data.nickname;
  phonenum.innerHTML = data.phoneNumber;
  area.innerHTML = data.region;
}
// 유저정보 put 수정
function handleUserSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const areaSelect = document.getElementById("area");

  const modifiedData = {
    name: nameInput.value,
    phone: phoneInput.value,
    area: areaSelect.value,
  };

  const formData = new FormData();
  formData.append("name", modifiedData.name);
  formData.append("phone", modifiedData.phone);
  formData.append("area", modifiedData.area);

  console.log(formData);

  const config = {
    method: "PUT",
    headers: headers,
  };

  const url = "http://52.63.140.248:8080/api/user";
  fetch(url, config, formData)
    .then((response) => response.json())
    .then((data) => {
      const userInfoBox = document.querySelector(".container-userInfo");
      const userModifyBox = document.querySelector(".container-userModify");
      const pageTitle = document.querySelector(".mypageText");
    pageTitle.innerHTML = "마이 페이지"
      toggleContainer(userInfoBox, userModifyBox);

      console.log("수정 완료:", data);
    });
}

// 비밀번호 put 수정

function handlePasswordSubmit() {
  const passwordInput = document.getElementById("password");
  const newPasswordInput = document.getElementById("new-password");
  const reEnterPasswordInput = document.getElementById("re-enter-password");
  console.log(passwordInput.length);

  if ((passwordInput.length !== 0 && newPasswordInput.length !== 0 && reEnterPasswordInput.length !== 0) 
  && newPasswordInput.value !== reEnterPasswordInput.value) {
    const errorMessage = document.querySelector('error-message');
    errorMessage.textContent = "새 비밀번호와 비밀번호 재입력이 일치하지 않습니다.";
    newPasswordInput.value = "";
    reEnterPasswordInput.value = "";
    return; // 일치하지 않을 경우 폼 제출을 중지합니다.
  }


  const modifiedData = {
    oldPassword: passwordInput.value,
    newPassword: newPasswordInput.value,
  };

  const config = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json', // JSON 형식으로 데이터를 보낼 것임을 명시
    },
    body: JSON.stringify(modifiedData), // 데이터를 JSON 문자열로 변환하여 전송
  };

  console.log("여기까지 왔다 통신직전 콘솔");
  const url = "http://52.63.140.248:8080/api/user/password";
  fetch(url, config)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const userInfoBox = document.querySelector(".container-userInfo");
      const passwordModifyBox = document.querySelector(
        ".container-passwordModify"
      );
      const pageTitle = document.querySelector(".mypageText");
       pageTitle.innerHTML = "마이 페이지"
      // toggleContainer(userInfoBox, passwordModifyBox);
      // const url = `http://127.0.0.1:5500/Seokhyun/html/login.html`;
      // window.location.href = url;
      console.log("수정 완료:", data);
    })
   .catch(error => {
    console.error("에러발생:", error);
  })
}

function logout(){
  const config = {
    method: "POST",
    headers: headers,
  };

  const url = "http://52.63.140.248:8080/api/logout";
  fetch(url,config)
    .then((response) => response.json())
    .then((data) => {
      console.log("성공");
      localStorage.clear();
      const url = `http://127.0.0.1:5500/Project/html/login.html`;
      window.location.href = url;
    })
    .catch(error => {
      // 에러 처리 로직을 작성합니다.
      console.error('에러 발생:', error);
    });
}
document.addEventListener("DOMContentLoaded", function () {
  const userModifyBtn = document.querySelector(".user-Modify");
  const userInfoBox = document.querySelector(".container-userInfo");
  const userModifyBox = document.querySelector(".container-userModify");

  userModifyBtn.addEventListener("click", (e) => {
    console.log(e);
    const pageTitle = document.querySelector(".mypageText");
    pageTitle.innerHTML = "개인정보 수정"
    toggleContainer(userModifyBox, userInfoBox);
  });

  const passwordBtn = document.querySelector(".password-modify");
  const passwordModifyBox = document.querySelector(".container-passwordModify");
  passwordBtn.addEventListener("click", (e) => {
    const pageTitle = document.querySelector(".mypageText");
    pageTitle.innerHTML = "비밀번호 변경";
    toggleContainer(passwordModifyBox, userInfoBox);
    
  });
});



let modalToggle = "";

const logoutmodal = document.getElementById("logout-modal");
const passwordmodifymodal = document.getElementById("password-modify-modal");
const openModalBtn = document.getElementById("open-modal");
const cancelModalBtn = document.getElementById("cancel-modal");
const confirmModalBtn = document.getElementById("confirm-modal");
const cancelModalBtn2 = document.getElementById("cancel-modal2");
const confirmModalBtn2 = document.getElementById("confirm-modal2");

const logoutbtn = document.querySelector(".logout");
logoutbtn.addEventListener("click", () => {
  modalToggle = "logout";
  logoutmodal.style.display = "block";
  document.body.style.overflow = "hidden"; // 스크롤바 제거


  localStorage.clear();
});

const passwordModifyBtn = document.querySelector(".password-modify-btn");
passwordModifyBtn.addEventListener("click", () => {
  console.log("모달이 켜져야하는데 이제");
  modalToggle = "password";
  passwordmodifymodal.style.display = "block";
  document.body.style.overflow = "hidden";
});

// 모달창
// 모달창 열기
// openModalBtn.addEventListener("click", () => {
//   modal.style.display = "block";
//   document.body.style.overflow = "hidden"; // 스크롤바 제거
// });
// 모달창 닫기
cancelModalBtn.addEventListener("click", () => {
  console.log(modalToggle);
  if (modalToggle === "logout") {
    logoutmodal.style.display = "none";
    document.body.style.overflow = "auto";
  }
  if (modalToggle === "password") {
    passwordmodifymodal.style.display = "none";
    document.body.style.overflow = "auto"; // 스크롤바 보이기
  }
});

confirmModalBtn.addEventListener("click", () => {
  if (modalToggle === "logout") {
    logout();
    logoutmodal.style.display = "none";
    document.body.style.overflow = "auto";
  }
  if (modalToggle === "password") {
    //여기다가 fetch 요청
    passwordmodifymodal.style.display = "none";
    document.body.style.overflow = "auto"; // 스크롤바 보이기
  }
});

cancelModalBtn2.addEventListener("click", () => {
  console.log(modalToggle);
  if (modalToggle === "logout") {
    logoutmodal.style.display = "none";
    document.body.style.overflow = "auto";
  }
  if (modalToggle === "password") {
    passwordmodifymodal.style.display = "none";
    document.body.style.overflow = "auto"; // 스크롤바 보이기
  }
});

confirmModalBtn2.addEventListener("click", () => {
  console.log(modalToggle)
  if (modalToggle === "logout") {
    logoutmodal.style.display = "none";
    document.body.style.overflow = "auto";
  }
  if (modalToggle === "password") {
    handlePasswordSubmit();
    passwordmodifymodal.style.display = "none";
    document.body.style.overflow = "auto"; // 스크롤바 보이기
  }
});
