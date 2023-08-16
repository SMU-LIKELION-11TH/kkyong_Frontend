const itemsection = document.querySelector('.item-section');
const reservationbtn = document.querySelector('.reservation-btn');

const accessToken = localStorage.getItem("Access-Token");
const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
});

const urlParams = new URLSearchParams(window.location.search);
const serviceId = urlParams.get("id");
console.log(serviceId);
    function serviceDetail() {
        const config = {
            method: 'GET',
            headers: headers,
        };
        fetch(`http://52.63.140.248:8080/api/reservations/${serviceId}`, config)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // 받아온 데이를 활용하여 화면에 아이템들을 동적으로 생성하여 표시
                // 예를 들어, data를 이용하여 DOM 조작을 진행하면 됩니다.
                const servicedata = data.data;
                createService(servicedata);
                createReserve(servicedata);


            })
            .catch(error => {
                console.error('Error:', error);
            });

    }
    serviceDetail();



    const cancelButton = document.querySelector(".cancel-btn");
    // 버튼 클릭 이벤트 핸들러 설정
    cancelButton.addEventListener("click", () => {
        initialService();
        alert("취소되었습니다!");
    });


function initialService() {
    const config = {
        method: 'DELETE',
        headers: headers,
    };
    fetch(`http://52.63.140.248:8080/api/reservations/${serviceId}`, config)

        .then(response => response.json())
        .then(data => {
            console.log(data);
            const targetURL = 'http://127.0.0.1:5500/Project/html/Reservationdetails.html';
            window.location.href = targetURL; // 페이지 이동
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


//장소 상세 윗부분 
function createService(data) {

    console.log("data", data);

    // 이름 요소 생성
    const nameBox = document.createElement('div');
    nameBox.className = 'name-box';
    const name = document.createElement('p');
    name.className = 'name';
    name.textContent = data.serviceName;
    const starImg = document.createElement('img');
    starImg.src = '../images/star.png';
    nameBox.appendChild(name);
    nameBox.appendChild(starImg);

    // 이미지 요소 생성
    const imgBox = document.createElement('div');
    imgBox.className = 'img-box';
    const serviceImg = document.createElement('img');
    serviceImg.className = 'service-img';
    serviceImg.src = '../images/itemImg.png';
    imgBox.appendChild(serviceImg);

    // 설명 요소 생성
    const describeBox = document.createElement('div');
    describeBox.className = 'describe-box';
    const descriptions = [
        '대상/모집정원 :' + data.serviceTarget,
        '장소 :' + data.place,
        '주소 : 서울특별시 ' + data.region, 
        '문의전화 :' + data.contact
    ];
    descriptions.forEach(descriptionText => {
        const description = document.createElement('p');
        description.textContent = descriptionText;
        describeBox.appendChild(description);
    });

    // 요소들을 section에 추가
    itemsection.appendChild(nameBox);
    itemsection.appendChild(imgBox);
    itemsection.appendChild(describeBox);

}
//예약확정부분
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
