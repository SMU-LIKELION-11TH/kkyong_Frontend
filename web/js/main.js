// main.js
// JavaScript 코드 추가

document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  var authorizationCode = urlParams.get("code");
  console.log(`authorizationCode : ${authorizationCode}`);
  if (authorizationCode) {
    // 이제 인가코드를 사용하여 액세스 토큰을 요청할 수 있습니다.
    $.ajax({
      type: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      data: {
        grant_type: "authorization_code",
        client_id: "66478dc0f3c580a87a16d92f87d36ede",
        redirect_uri: "http://127.0.0.1:5500/web/html/Main.html",
        code: authorizationCode,
      },
      contentType: "application/x-www-form-urlencoded;charset=utf-8",
      dataType: null,
      success: function (response) {
        Kakao.Auth.setAccessToken(response.access_token);
        document.querySelector("button.api-btn").style.visibility = "visible";
      },
      error: function (jqXHR, error) {},
    });
  }
});
const searchForm = document.getElementById("searchForm");
const keywordInput = document.getElementById("keyword");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // 폼 제출 기본 동작 막기

    const keyword = keywordInput.value; // 입력한 검색어 값
    if (keyword.trim() !== "") {
        const searchUrl = `/SearchResult.html?keyword=${encodeURIComponent(keyword)}`;
        window.location.href = searchUrl;
    }
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
