window.addEventListener('DOMContentLoaded', () => {
    const searchParams = new URLSearchParams(window.location.search);
    const keyword = searchParams.get('keyword');
    const accessToken = localStorage.getItem('Access_Token');
    const headers = new Headers({
        method: 'GET',
        Authorization: `Bearer ${accessToken}`,

      });
    const inputElement = document.querySelector('.inputbox');
    inputElement.value = keyword;   
    console.log(keyword);
    searchloadGet(keyword);
    // keyword를 이용하여 백엔드로 GET 요청 보내기
    // fetch(`/api/search?keyword=${keyword}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         // 받아온 데이를 활용하여 화면에 아이템들을 동적으로 생성하여 표시
    //         // 예를 들어, data를 이용하여 DOM 조작을 진행하면 됩니다.
    //         console.log(data); // 받아온 데이터를 콘솔에 출력하여 확인하는 예시터
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
});

function searchloadGet(keyword) {
    fetch(`http://52.63.140.248:8080/api/services/search?serviceName=${keyword}`, headers)
        .then(response => response.json())
        .then(data => {
            // 받아온 데이를 활용하여 화면에 아이템들을 동적으로 생성하여 표시
            // 예를 들어, data를 이용하여 DOM 조작을 진행하면 됩니다.
            const servicedata = data.data;
            servicedata.map(item => {
                createService(item);    
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// 새로운 section 요소 생성
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
    document.body.appendChild(sectionElement);
   }
