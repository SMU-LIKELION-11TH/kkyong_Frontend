const itemsection = document.querySelector('.item-section');
let userRegion = {}

// 뒤로가기
const arrowImg = document.querySelector('.arrow-img');

arrowImg.addEventListener('click', () => {
  window.history.back();
});


const accessToken = localStorage.getItem("Access-Token");
const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
});
const config = {
    method: 'GET',
    headers: headers,
};
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

apiUserGet();

function apiUserGet(){
    fetch('http://52.63.140.248:8080/api/user', config)
    .then(response => response.json())
    .then(data => {
       console.log(data.data);
       userRegion = data.data;
       console.log(userRegion.region);

       // userRegion 값을 받아온 후에 apiServiceGet() 함수 호출
       apiServiceGet();
    })
    .catch(error => {
      console.error('에러 발생:', error);
    });
}

function apiServiceGet(region) {
    console.log(category, userRegion.region);
    fetch(`http://52.63.140.248:8080/api/services/type/${category}?region=${region ? region : userRegion.region}`, config)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const servicedata = data.data;
        servicedata.map(item => {
            createService(item);    
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


// JavaScript로 버튼을 토글하는 함수
document.addEventListener('DOMContentLoaded', function () {
    const myAreaButton = document.querySelector('.myArea p');
    const otherAreaButton = document.querySelector('.otherArea p');
    const onLine = document.querySelector('.On-line');
    const offLine = document.querySelector('.Off-line');
    const inputArea = document.querySelector('.inputArea');
    
    // 다른 지역 선택하기 코드
    const areaSelect = document.getElementById("area");

    areaSelect.addEventListener("change", function () {
        const selectedArea = areaSelect.value; // 선택한 옵션의 값
        console.log("선택한 지역:", selectedArea);
        apiServiceGet(selectedArea);
        
    });
    function toggleButton(button, underline, value) {

        if(value === "Off-text"){
            inputArea.style.display ='flex';
            itemsection.style.height='29.8125rem'
        }
        if(value === "On-text"){
            inputArea.style.display ='none';
            itemsection.style.height='33.8125rem'
        }
        myAreaButton.classList.remove('active');
        otherAreaButton.classList.remove('active');
        onLine.style.display = 'none';
        offLine.style.display = 'none';

        button.classList.add('active');
        underline.style.display = 'block';
    }

    myAreaButton.addEventListener('click', function (e) {
        toggleButton(myAreaButton, onLine, e.target.className);
    });

    otherAreaButton.addEventListener('click', function (e) {
        toggleButton(otherAreaButton, offLine, e.target.className);
        
    });

    // 페이지 로딩 시 "우리 동네" 버튼을 선택 상태로 설정
    toggleButton(myAreaButton, onLine, "On-text");
});


//item 동적 생성
function createService(data){
    console.log(data);
    const sectionElement = document.createElement('section');
    sectionElement.className = 'item-box';
    
    // 이미지 요소 생성
    const imageBox = document.createElement('div');
    imageBox.className = 'image-box';
    const image = document.createElement('img');
    image.src = data.imageUrl;
    image.classList.add("imageItem");
    imageBox.appendChild(image);
    
    // 텍스트 요소 생성
    const textBox = document.createElement('div');
    textBox.className = 'text-box';
    const place = document.createElement('p');
    place.className = 'place';
    place.textContent = data.serviceName;
    const date = document.createElement('div');
    date.className = 'date';
    const dateStart = document.createElement('p');
    dateStart.className = 'date-start';
    dateStart.textContent = `기간: ${data.serviceStart}`;
    const dateEnd = document.createElement('p');
    dateEnd.className = 'date-end';
    dateEnd.textContent = `~ ${data.serviceEnd}`;
    const reservation = document.createElement('p');
    reservation.className = 'reservation';
    reservation.textContent = data.reservation ? '예약가능' : '예약불가';
    
    date.appendChild(dateStart);
    date.appendChild(dateEnd);
    textBox.appendChild(place);
    textBox.appendChild(date);
    textBox.appendChild(reservation);
    
    // 요소들을 body에 추가
    sectionElement.appendChild(imageBox);
    sectionElement.appendChild(textBox);
    itemsection.appendChild(sectionElement);

     // sectionElement.addEventListener('click', () => {
    //     // 페이지 이동 및 데이터 전달
    //     const url = `http://127.0.0.1:5500/api/services/${data.id}`;
    //     window.location.href = url;
    //   });
    sectionElement.addEventListener('click', () => {
        // 페이지 이동 및 데이터 전달
        const url = `http://52.63.140.248/web/html/Placedetailpage.html?id=${data.id}`;
        window.location.href = url;
      });
   }

