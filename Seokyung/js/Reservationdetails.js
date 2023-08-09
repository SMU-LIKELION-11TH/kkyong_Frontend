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

