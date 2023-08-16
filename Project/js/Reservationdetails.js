const itemsection = document.querySelector('.item-section');
const defaultScreen = document.querySelector('.defaultScreen');

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

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);
  //여기서 체육,문화,진로,복지 머 이런식으로 위의 const category에서 값 받아서
  //백엔드 통신시 url에 붙이면 끝.
  fetch(`http://52.63.140.248:8080/api/reservations/my`, config)
    .then(response => response.json())
    .then(data => {
      const servicedata = data.data;
      console.log(servicedata);
      servicedata.map(item => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
      const currentDay = currentDate.getDate();

      const [year, month, day] = item.reservationDate.split("-").map(Number);

      if (currentYear < year || (currentYear === year && currentMonth < month) || (currentYear === year && currentMonth === month && currentDay < day)) {
        console.log("현재 날짜는 " + earlierDate + " 보다 이전입니다.");
        createService(item, "today");
      } else if (currentYear === year && currentMonth === month && currentDay === day) {
        console.log("현재 날짜는 " + earlierDate + " 와 같습니다.");
        createService(item, "today");
      } else {
        console.log("현재 날짜는 " + earlierDate + " 보다 나중입니다.");
        createService(item, "previousday");
        // 이전예약 부분
      }
    })
      console.log(today)
      if (servicedata.length !== 0) {
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
function createService(data, time) {
  console.log(data);

  const alreadyUsed = document.querySelector(".already-used");
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

  if(time === "previousday"){
    itemsection.appendChild(sectionElement);
  }
  if(time === 'today'){
    itemsection.appendChild(alreadyUsed);
  }
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

  alreadyUsed.addEventListener('click', () => {
    const url = `http://127.0.0.1:5500/Seokhyun/html/Placedetailpage.html?id=${data.id}`;
    window.location.href = url;
  })
}

