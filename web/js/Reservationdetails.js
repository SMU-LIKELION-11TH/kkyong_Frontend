const itemsection = document.querySelector('.item-section');
const defaultScreen = document.querySelector('.defaultScreen');
const alreadyUsed = document.querySelector('.already-used');

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

  function DetailGet() {

    fetch(`http://52.63.140.248:8080/api/reservations/my`, config)
      .then(response => response.json())
      .then(data => {

        console.log(data);
        const servicedata = data.data;
        createService(servicedata);



        for(let i=0; i<servicedata.length; i++) {
          console.log(servicedata[i]);
        }
        console.log(servicedata);
        servicedata.map((item) => {
          console.log(item);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
        const currentDay = currentDate.getDate();

        const [year, month, day] = item.reservationDate.split("-").map(Number);

        if (currentYear < year || (currentYear === year && currentMonth < month) || (currentYear === year && currentMonth === month && currentDay < day)) {
          console.log("현재 날짜는 "  + " 보다 이전입니다.");
          createService(item, "today");
        } else if (currentYear === year && currentMonth === month && currentDay === day) {
          console.log("현재 날짜는 "  + " 와 같습니다.");
          createService(item, "today");
        } else {
          console.log("현재 날짜는 "  + " 보다 나중입니다.");
          createService(item, "previousday");
          // 이전예약 부분
        }
      })
        console.log(today)
        if (servicedata.length !== 0) {
          console.log("hi");
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

    }
    DetailGet();


//item 동적 생성
function createService(data, time) {
  console.log(data);
  // 부모 요소 생성
const availableDiv = document.createElement('div');
availableDiv.classList.add('available');

const reserveContainerDiv = document.createElement('div');
reserveContainerDiv.classList.add('reserve-container');

// 예약 항목 생성
const reserveItemDiv1 = document.createElement('div');
reserveItemDiv1.classList.add('reserve-item');
const reserveNoParagraph = document.createElement('p');
reserveNoParagraph.classList.add('reserve-no');
const reserveNumberSpan = document.createElement('span');
reserveNumberSpan.classList.add('reserve-number');
reserveNumberSpan.textContent = data.reservationNumber;
reserveNoParagraph.appendChild(document.createTextNode('No.'));
reserveNoParagraph.appendChild(reserveNumberSpan);
reserveItemDiv1.appendChild(reserveNoParagraph);

const reserveItemDiv2 = document.createElement('div');
reserveItemDiv2.classList.add('reserve-item');
const reserveNameParagraph = document.createElement('p');
reserveNameParagraph.classList.add('reserve-name');
reserveNameParagraph.textContent = data.serviceName;
reserveItemDiv2.appendChild(reserveNameParagraph);

const reserveItemDiv3 = document.createElement('div');
reserveItemDiv3.classList.add('reserve-item');
const reserveDateParagraph = document.createElement('p');
reserveDateParagraph.classList.add('reserve-date');
reserveDateParagraph.textContent = '일정';
const reserveTimeSpan = document.createElement('span');
reserveTimeSpan.classList.add('reserve-time');
const reserveTimeParagraph1 = document.createElement('p');
reserveTimeParagraph1.textContent = data.reservationDate;
const reserveTimeParagraph2 = document.createElement('p');
reserveTimeParagraph2.textContent = `${data.startTime} ~ ${data.endTime}`;
reserveTimeSpan.appendChild(reserveTimeParagraph1);
reserveTimeSpan.appendChild(reserveTimeParagraph2);
reserveItemDiv3.appendChild(reserveDateParagraph);
reserveItemDiv3.appendChild(reserveTimeSpan);

const reserveItemDiv4 = document.createElement('div');
reserveItemDiv4.classList.add('reserve-item');
const reserveLocationParagraph = document.createElement('p');
reserveLocationParagraph.classList.add('reserve-location');
reserveLocationParagraph.textContent = '주소';
const reserveLocationDetailSpan = document.createElement('span');
reserveLocationDetailSpan.classList.add('reserve-locationdetail');
reserveLocationDetailSpan.textContent = `서울특별시 ${data.region}`;
reserveItemDiv4.appendChild(reserveLocationParagraph);
reserveItemDiv4.appendChild(reserveLocationDetailSpan);

// 상세보기 버튼 생성
const detailViewButton = document.createElement('button');
detailViewButton.classList.add('detailview-btn');
const detailViewLink = document.createElement('p');
detailViewLink.textContent = '상세보기';
detailViewButton.appendChild(detailViewLink);

// 요소들을 계층에 추가
reserveContainerDiv.appendChild(reserveItemDiv1);
reserveContainerDiv.appendChild(reserveItemDiv2);
reserveContainerDiv.appendChild(reserveItemDiv3);
reserveContainerDiv.appendChild(reserveItemDiv4);
reserveContainerDiv.appendChild(detailViewButton);

availableDiv.appendChild(reserveContainerDiv);
console.log(data.reservationNumber);
  if(time === "previousday"){
    itemsection.appendChild(availableDiv);
    detailViewButton.addEventListener('click', () => {
      const url = `http://52.63.140.248/web/html/Usedreservaion.html?id=${data.reservationNumber}`;
      window.location.href = url;
    })
  }
  if(time === 'today'){
    alreadyUsed.appendChild(availableDiv);
    detailViewButton.addEventListener('click', () => {
      // 페이지 이동 및 데이터 전달
      const url = `http://52.63.140.248/web/html/Cancelreservation.html?id=${data.reservationNumber}`;
      window.location.href = url;
    });
  }
}






//예약정보 데이터 불러오기

// JavaScript 코드
function createReserve(data) {
  console.log(data);
  // 데이터를 가상으로 생성하거나 서버에서 가져와서 사용할 수 있습니다.
  const reservations = [
      {
          number: data.reservationNumber,
          name: data.serviceName,
          date: data.reservationDate,
          starttime: data.startTime,
          endtime: data.endTime,
          location: "서울특별시" + data.region,
      },
      // 다른 예약 정보들...
  ];
console.log(reservations);
  const reserveContainer = document.querySelector(".reserve-container");

  // 예약 정보를 순회하며 reserve-item을 생성하고 추가합니다.
  reservations.forEach(reservation => {
      const reserveItem = document.createElement("div");
      reserveItem.classList.add("reserve-item");

      const reserveNumber = document.createElement("p");
      reserveNumber.classList.add("reserve-no");
      reserveNumber.innerHTML = `No.<span class="reserve-number">${reservation.number}</span>`;
      reserveItem.appendChild(reserveNumber);

      const reserveName = document.createElement("p");
      reserveName.classList.add("reserve-name");
      reserveName.textContent = reservation.name;
      reserveItem.appendChild(reserveName);

      const reserveDate = document.createElement("p");
      reserveDate.classList.add("reserve-date");
      reserveDate.textContent = "일정";
      reserveItem.appendChild(reserveDate);

      const reserveTime = document.createElement("span");
      reserveTime.classList.add("reserve-time");
      reserveTime.innerHTML = `
          <p>${reservation.date}</p>
          <p>${reservation.starttime} ~ ${reservation.endtime}</p>
      `;
      reserveItem.appendChild(reserveTime);

      const reserveLocation = document.createElement("p");
      reserveLocation.classList.add("reserve-location");
      reserveLocation.textContent = "주소";
      reserveItem.appendChild(reserveLocation);

      const reserveLocationDetail = document.createElement("span");
      reserveLocationDetail.classList.add("reserve-locationdetail");
      reserveLocationDetail.textContent = reservation.location;
      reserveItem.appendChild(reserveLocationDetail);

      reserveContainer.appendChild(reserveItem);
  });
};
