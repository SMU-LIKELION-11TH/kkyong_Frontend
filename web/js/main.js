
const links = document.querySelectorAll(".bottomnav a");
console.log(links);
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

// main.js
// JavaScript 코드 추가

  var urlParams = new URLSearchParams(window.location.search);
 console.log(urlParams);
  let refreshToken = urlParams.get("refreshToken");
  let accessToken = urlParams.get("accessToken");

  if(refreshToken && accessToken) {
    localStorage.setItem("Refresh-Token", refreshToken);
    localStorage.setItem("Access-Token", accessToken);
  }
  
  console.log(accessToken, refreshToken);
  
const searchForm = document.getElementById("searchForm"); // # 제거
const keywordInput = document.getElementById("keyword");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const keyword = keywordInput.value;
    if (keyword.trim() !== "") {
        const searchUrl = `http://52.63.140.248:8080/web/html/SearchResult.html?keyword=${encodeURIComponent(keyword)}`;
        window.location.href = searchUrl;
        console.log(searchUrl);
    }
});
// http://52.63.140.248
