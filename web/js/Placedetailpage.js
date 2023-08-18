let dataid = "";

const itemsection = document.querySelector('.item-section');
const reservationbtn = document.querySelector('.reservation-btn');

const arrowImg = document.querySelector('.arrow-img');

arrowImg.addEventListener('click', () => {
  window.history.back();
});

const accessToken = localStorage.getItem("Access-Token");
const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
    method: 'GET',
});

function serviceDetailGet(serviceId){
  const config = {
    headers: headers,
};
  fetch(`http://52.63.140.248:8080/api/services/${serviceId}`, config)
  .then(response => response.json())
  .then(data => {
     console.log(data.data);
     let servicedata = data.data;
     dataid = servicedata.id;
     createService(servicedata);    
     // userRegion 값을 받아온 후에 apiServiceGet() 함수 호출
  })
  .catch(error => {
    console.error('에러 발생:', error);
  });
}


window.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get("id");
    console.log(serviceId);
    serviceDetailGet(serviceId);
  
});

function favoriteEnroll(serviceId){
  console.log(`favoriteEnroll: ${serviceId}`);
  const config = {
    method: 'POST',
    headers: headers,
};
  fetch(`http://52.63.140.248:8080/api/services/${serviceId}/bookmark`, config)
  .then(response => console.log(response))
  .then(data => {
     console.log(data);
  })
  .catch(error => {
    console.error('에러 발생:', error);
  });
}

//즐겨찾기 해제
const cancelButton = document.querySelector(".cancel-btn");
// 버튼 클릭 이벤트 핸들러 설정
cancelButton.addEventListener("click", () => {
    favoriteService();
    alert("즐겨찾기 취소되었습니다!");
});


function favoriteService() {
const config = {
    method: 'DELETE',
    headers: headers,
};
fetch(`http://52.63.140.248:8080/api/services/${dataid}/bookmark`, config)

    .then(response => response.json())
    .then(data => {
        console.log(data);
        const targetURL = 'http://52.63.140.248/web/html/Favorites.html';
        window.location.href = targetURL; // 페이지 이동
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function createService(data){

    // 이름 요소 생성
    const nameBox = document.createElement('div');
    nameBox.className = 'name-box';
    const name = document.createElement('p');
    name.className = 'name';
    name.textContent = data.serviceName;
    const starImg = document.createElement('img');
    starImg.classList.add("starImg");
    starImg.src = '../images/star.png';
    nameBox.appendChild(name);
    nameBox.appendChild(starImg);

    // 이미지 요소 생성
    const imgBox = document.createElement('div');
    imgBox.className = 'img-box';
    const serviceImg = document.createElement('img');
    serviceImg.className = 'service-img';
    serviceImg.src = data.imageUrl;
    imgBox.appendChild(serviceImg);


    starImg.addEventListener('click', () => {
      console.log(data.id);
      if (starImg.src.includes("lightStar")) {
          starImg.src = "../images/star.png"; // 현재 이미지가 lightStar라면 원래 별 이미지로 변경
          // 여기에 해당하는 fetch 함수 호출 등의 로직 추가
      } else {
        favoriteEnroll(data.id);
          starImg.src = "../images/lightStar.png"; // 현재 이미지가 별이 아니라면 빛나는 별 이미지로 변경
      }
  });

  
    // 설명 요소 생성
    const describeBox = document.createElement('div');
    describeBox.className = 'describe-box';
    const descriptions = [
      `대상/모집정원 : ${data.serviceTarget}`,
      `장소 : ${data.place}`,
      `주소 : ${data.region}`,
      `이용기간 시작 :${data.serviceStart}`,
      `이용기간 종료 :${data.serviceEnd}`,
      `문의전화 : ${data.contact}`
    ];
    descriptions.forEach(descriptionText => {
      const description = document.createElement('p');
      description.innerHTML = descriptionText; // innerHTML 사용하여 <br> 태그를 적용
      describeBox.appendChild(description);
    });
    
    // 요소들을 section에 추가
    itemsection.appendChild(nameBox);
    itemsection.appendChild(imgBox);
    itemsection.appendChild(describeBox);

    // section 요소를 container에 추가
    // const container = document.getElementById('container');
    // container.appendChild(sectionElement);

     // sectionElement.addEventListener('click', () => {
    //     // 페이지 이동 및 데이터 전달
    //     const url = `http://127.0.0.1:5500/api/services/${data.id}`;
    //     window.location.href = url;
    //   });
    reservationbtn.addEventListener('click', () => {
        // 페이지 이동 및 데이터 전달
        const url = `http://52.63.140.248/web/html/ReservationPossible.html?id=${data.id}`;
        window.location.href = url;
      });
   }

