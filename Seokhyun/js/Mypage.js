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
  const email = document.querySelector("user-id");
  const name = document.querySelector("user-name");
  const kakaoID = document.querySelector("user-kakaoID");
  const phonenum = document.querySelector(".user-phonenum");
  const area = document.querySelector(".user-area");

  email.innerHTML = data.email;
  name.innerHTML = data.nickname;
  kakaoID.innerHTML = data.kakaoId;
  phonenum.innerHTML = data.phoneNumber;
  area.innerHTML = data.region;
}
// 유저정보 put 수정
function handleUserSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("name");
  const kakaoIdInput = document.getElementById("kakaoId");
  const phoneInput = document.getElementById("phone");
  const areaSelect = document.getElementById("area");

  const modifiedData = {
    name: nameInput.value,
    kakaoId: kakaoIdInput.value,
    phone: phoneInput.value,
    area: areaSelect.value,
  };

  const formData = new FormData();
  formData.append("name", modifiedData.name);
  formData.append("kakaoId", modifiedData.kakaoId);
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
      toggleContainer(userInfoBox, userModifyBox);
      console.log("수정 완료:", data);
    });
}

// 비밀번호 put 수정
function handlePasswordSubmit(e) {
  e.preventDefault();
  const passwordInput = document.getElementById("password");
  const newPasswordInput = document.getElementById("new-password");
  const reEnterPasswordInput = document.getElementById("re-enter-password");

  const modifiedData = {
    password: passwordInput.value,
    newPassword: newPasswordInput.value,
    reEnterPassword: reEnterPasswordInput.value,
  };

  const formData = new FormData();
  formData.append("password", modifiedData.password);
  formData.append("newPassword", modifiedData.newPassword);
  formData.append("reEnterPassword", modifiedData.reEnterPassword);

  console.log(formData);

  const config = {
    method: "PUT",
    headers: headers,
  };

  const url = "http://52.63.140.248:8080/api/user/password";
  fetch(url,config,formData)
    .then((response) => response.json())
    .then((data) => {
      const userInfoBox = document.querySelector(".container-userInfo");
      const passwordModifyBox = document.querySelector(
        ".container-passwordModify"
      );
      toggleContainer(userInfoBox, passwordModifyBox);
      console.log("수정 완료:", data);
    });
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
    toggleContainer(userModifyBox, userInfoBox);
  });

  const passwordBtn = document.querySelector(".password-modify");
  const passwordModifyBox = document.querySelector(".container-passwordModify");
  passwordBtn.addEventListener("click", (e) => {
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
  if (modalToggle === "logout") {
    logoutmodal.style.display = "none";
    document.body.style.overflow = "auto";
  }
  if (modalToggle === "password") {
    //여기다가 fetch 요청
    passwordmodifymodal.style.display = "none";
    document.body.style.overflow = "auto"; // 스크롤바 보이기
  }
});
