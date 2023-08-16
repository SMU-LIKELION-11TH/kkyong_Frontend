const itemsection = document.querySelector('.item-section');
const defaultScreen = document.querySelector('.defaultScreen');
window.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");


    // 백엔드에 GET 요청 보내기
    // const apiUrl = `https://example.com/api/data?category=${category}`;
    // fetch(apiUrl)


//여기서 체육,문화,진로,복지 머 이런식으로 위의 const category에서 값 받아서
//백엔드 통신시 url에 붙이면 끝.
    fetch(`../mockdata/search.json`)
        .then(response => response.json())
        .then(data => {
            const servicedata = data.data;
            console.log(servicedata);
            if(servicedata.length === 0){
              defaultScreen.style.display = 'none';
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
        const url = `http://127.0.0.1:5500/Seokhyun/html/Placedetailpage.html?id=${data.id}`;
        window.location.href = url;
      });
   }



   //알림톡 구현

   function makeSignature() {


    const crypto = require('crypto');


    var space = ' '; // one space
    var newLine = '\n'; // new line
    var method = 'POST'; // method
    var timestamp = Date.now().toString(); // current timestamp (epoch)
    var accessKey = process.env.gjyQeq5aGQpJQ4urLqKd; // access key id
    var secretKey = process.env.IC8lhjgq96ymNOqWATwtchsYqtHtDkWAXNbkqny6; // secret key
    const url2 = `/alimtalk/v2/services/${process.env.ncp:kkobizmsg:kr:3136326:kkyong-seoul}/messages`;
    let message = [];
    let hmac = crypto.createHmac('sha256', secretKey);
  
    message.push(method);
    message.push(space);
    message.push(url2);
    message.push(newLine);
    message.push(timestamp);
    message.push(newLine);
    message.push(accessKey);
    return hmac.update(message.join('')).digest('base64').toString();
  
   }

   const getRequestParams = ({ type, to, data }) => {
    if (type === 'food') {
      return {
        templateCode: type,
        plusFriendId: process.env.MyChannelId,
        messages: [
          {
            to,
            content: `내가 만든 ${ data.food }는 맛있습니다.`,
            buttons: [
              {
                type: 'WL',
                name: '레시피 확인',
                linkMobile: 'https://food.tech.kr',
                linkPC: 'https://food.tech.kr',
              }
            ]
          }
        ]
      }
    }
    
    if (type === 'car') {
      return {
        ...
      }
    }
    
    ...
  }

  const sendKakaoMessage = async ({ templateCode, to, data }) => {
    const params = getRequestParams({ type: templateCode, to, data });
    
    const { data: result } = await axios.post(`https://sens.apigw.ntruss.com/alimtalk/v2/services/${process.env.NAVER_CHANNEL}/messages`, params, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-apigw-timestamp': Date.now().toString(),
        'x-ncp-iam-access-key': process.env.NAVER_ACCESSKEY,
        'x-ncp-apigw-signature-v2': makeSignature(),
      },
    });
    
    console.log('과연? ', result);
  }