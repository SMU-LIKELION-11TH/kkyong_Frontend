const itemsection = document.querySelector('.item-section');
const defaultScreen = document.querySelector('.defaultScreen');

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
window.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");


    // 백엔드에 GET 요청 보내기
    // const apiUrl = `https://example.com/api/data?category=${category}`;
    // fetch(apiUrl)


//여기서 체육,문화,진로,복지 머 이런식으로 위의 const category에서 값 받아서
//백엔드 통신시 url에 붙이면 끝.
    fetch(`http://52.63.140.248:8080/api/services/bookmark`, config)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const servicedata = data.data;
            console.log(servicedata);
            if(servicedata.length !== 0){
              defaultScreen.style.display = 'none';
              console.log("hi");
            servicedata.map(item => {
                createService(item);    
            })
          } else {
              defaultScreen.style.display = 'block';
          }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


// JavaScript로 버튼을 토글하는 함수
document.addEventListener('DOMContentLoaded', function () {
    const myAreaButton = document.querySelector('.myArea p');
    const otherAreaButton = document.querySelector('.otherArea p');
    const onLine = document.querySelector('.On-line');
    const offLine = document.querySelector('.Off-line');
    const inputArea = document.querySelector('.inputArea');
    

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
    image.classList.add("itemImg");
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
        const url = `http://127.0.0.1:5500/web/html/Placedetailpage.html?id=${data.id}`;
        window.location.href = url;
      });
   }

