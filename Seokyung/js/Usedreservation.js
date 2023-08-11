const itemsection = document.querySelector('.item-section');
const reservationbtn = document.querySelector('.reservation-btn');
window.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    // category 이름을 title 영역에 표시
    // document.getElementById("category-title").textContent = category;

    // 백엔드에 GET 요청 보내기
    // const apiUrl = `https://example.com/api/data?category=${category}`;
    // fetch(apiUrl)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         // 받아온 데이터를 data-content 영역에 표시
    //         const dataContent = document.getElementById("data-content");
    //         dataContent.innerHTML = `<p>${data}</p>`; // 받아온 데이터를 여기서 표시하도록 하세요.
    //     })
    //     .catch((error) => {
    //         console.error("Error fetching data:", error);
    //     });

//여기서 체육,문화,진로,복지 머 이런식으로 위의 const category에서 값 받아서
//백엔드 통신시 url에 붙이면 끝.
    fetch(`../mockdata/reserveDetail.json`)
        .then(response => response.json())
        .then(data => {
            // 받아온 데이를 활용하여 화면에 아이템들을 동적으로 생성하여 표시
            // 예를 들어, data를 이용하여 DOM 조작을 진행하면 됩니다.
            const servicedata = data.data;
            createService(servicedata);    
        })
        .catch(error => {
            console.error('Error:', error);
        });
});




function createService(data){

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
        '대상/모집정원 :' + data.target,
        '장소 :'+data.place,
        '주소 : 서울특별시 '+data.place,
        '이용기간 :'+ data.time[0].startTime + '-' + data.time[0].endTime,
        '문의전화 :'+ data.contact
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
        const url = `http://127.0.0.1:5500/Seokhyun/html/ReservationPossible.html`;
        window.location.href = url;
      });
   }
