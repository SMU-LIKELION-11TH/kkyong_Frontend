
const urlParams = new URLSearchParams(window.location.search);
const serviceId = urlParams.get("id");
console.log(serviceId);
window.onload = function () {
  buildCalendar();
  timeTableshow();
  updateTime();
};


const reservation = {
  day: 0,
  month : 0,
  starttime: "",
  endtime: "",
  year: 0,
  serviceId: 0,
};
reservation.serviceId = serviceId;


const accessToken = localStorage.getItem("Access-Token");
const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
});

const unavailableTimes = [
  { startTime: "12:00", endTime: "14:00" },
  { startTime: "16:00", endTime: "18:00" },
  { startTime: "19:00", endTime: "20:00" },
];

fetch("../mockdata/reservationTime.json")
  .then((response) => response.json())
  .then((data) => console.log(data));

// 날짜 선택시 시간 테이블 보여지도록 설정
// 만약 선택한 날짜가 ~라면 그 날짜에 따라서 예약가능한 시간을 보여줘야해.
function timeTableshow() {
  const timeTable = document.querySelector(".time-table");
  timeTable.style.display = reservation.day === 0 ? "none" : "flex";
}

// 시간 테이블
document.addEventListener("DOMContentLoaded", function () {
  // 시간대에 대한 상수 배열
  const timeRanges = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const pTags = document.querySelectorAll(".time-table p");

  // 선택된 시간대의 인덱스를 저장하는 변수
  let selectedStartTimeIndex = -1;
  let selectedEndTimeIndex = -1;

  // 선택 가능한 시간대 클래스 추가
  pTags.forEach((p, index) => {
    console.log("여기는 pTag forEach 있는 곳 ");
    const timeString = p.innerText;
    const isUnavailable = unavailableTimes.some((timeRange) => {
      return (
        timeString >= timeRange.startTime && timeString <= timeRange.endTime
      );
    });

    if (isUnavailable) {
      p.classList.add("unavailable");
    } else {
      p.classList.add("available");
    }

    p.addEventListener("click", () => {
        if (!p.classList.contains("available")) {
          alert("선택할 수 없는 시간대입니다.");
          return;
        }
      
        if (selectedStartTimeIndex === -1) {
          selectedStartTimeIndex = index;
          pTags[index].classList.add("selected");
        } else if (selectedEndTimeIndex === -1) {
          if (index >= selectedStartTimeIndex) {
            // 추가된 부분: 시작 시간과 종료 시간 사이에 unavailable 시간대 체크
            const isUnavailableBetweenSelectedTimes = unavailableTimes.some(
              (timeRange) => {
                return (
                  timeRanges[index] >= timeRange.startTime &&
                  timeRanges[selectedStartTimeIndex] <= timeRange.endTime
                );
              }
            );
      
            if (!isUnavailableBetweenSelectedTimes) {
              selectedEndTimeIndex = index;
              if (selectedStartTimeIndex === selectedEndTimeIndex) {
                selectedStartTimeIndex = -1;
                selectedEndTimeIndex = -1;
                updateSelectedTimeClasses();
                updateTime();
              } else {
                updateSelectedTimeClasses();
                updateTime();
              }
            } else {
              alert("선택할 수 없는 시간대가 포함되어 있습니다.");
            }
          } else {
            alert("시간을 다시 선택해주세요");
          }
        } else {
          selectedStartTimeIndex = index;
          selectedEndTimeIndex = -1;
          updateSelectedTimeClasses();
          updateTime();
        }
      });
  });

  function updateSelectedTimeClasses() {
    pTags.forEach((p, index) => {
      p.classList.remove("selected");
      if (index >= selectedStartTimeIndex && index <= selectedEndTimeIndex) {
        p.classList.add("selected");
      }
    });
  }

  function updateTime() {
    const startTime = document.querySelector(".start-time");
    const endTime = document.querySelector(".end-time");

    if (selectedStartTimeIndex !== -1 && selectedEndTimeIndex !== -1) {
      startTime.innerText = timeRanges[selectedStartTimeIndex];
      endTime.innerText = timeRanges[selectedEndTimeIndex];
      reservation.starttime = timeRanges[selectedStartTimeIndex];
      reservation.endtime = timeRanges[selectedEndTimeIndex];
    } else {
      startTime.innerText = "";
      endTime.innerText = "";
    }
  }
});

function updateTime() {
  const startTime = document.querySelector(".start-time");
  const endTime = document.querySelector(".end-time");
  startTime.innerText = reservation.starttime;
  endTime.innerText = reservation.endtime;
}

let nowMonth = new Date();
console.log(`nowMonth : ${nowMonth}`);
let today = new Date();
today.setHours(0, 0, 0, 0);

function buildCalendar() {
  let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1); // 이번달 1일
  let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0); // 이번달 마지막날

  // 이번달 1일의 시작 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  let firstDateStartDay = firstDate.getDay();
  console.log(firstDateStartDay);
  // 이번달의 시작 요일이 월요일이 아닌 경우
  if (firstDateStartDay !== 1) {
    let offset = firstDateStartDay; // 전달의 날짜를 추가.
    firstDate.setDate(firstDate.getDate() - offset); // 이전 달로 돌아가서 월요일로 설정
  }

  let lastDateEndDay = lastDate.getDay();
  console.log(lastDateEndDay);

  if (lastDateEndDay !== 6) {
    let offset = 6 - lastDateEndDay;
    lastDate.setDate(lastDate.getDate() + offset);
  }
  let tbody_Calendar = document.querySelector(".Calendar > tbody");
  document.getElementById("calYear").innerText = nowMonth.getFullYear(); // 연도 숫자 갱신
  reservation.year = nowMonth.getFullYear();
  document.getElementById("calMonth").innerText = leftPad(
    nowMonth.getMonth() + 1
  ); // 월 숫자 갱신
  reservation.month = leftPad(nowMonth.getMonth() + 1);
  console.log(leftPad(nowMonth.getMonth() + 1));
  console.log(reservation);

  while (tbody_Calendar.rows.length > 0) {
    // 이전 출력결과가 남아있는 경우 초기화
    tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
  }

  let nowRow = tbody_Calendar.insertRow(); // 첫번째 행 추가

  for (let j = 0; j < firstDate.getDay(); j++) {
    // 이번달 1일의 요일만큼
    let nowColumn = nowRow.insertCell(); // 열 추가
  }

  for (
    let nowDay = firstDate;
    nowDay <= lastDate;
    nowDay.setDate(nowDay.getDate() + 1)
  ) {
    // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복

    let nowColumn = nowRow.insertCell(); // 새 열을 추가하고
    nowColumn.innerText = leftPad(nowDay.getDate()); // 추가한 열에 날짜 입력

    if (nowDay.getDay() == 0) {
      // 일요일인 경우 글자색 빨강으로
      nowColumn.style.color = "#DC143C";
    }
    if (nowDay.getDay() == 6) {
      // 토요일인 경우 글자색 파랑으로 하고
      nowColumn.style.color = "#0000CD";
      nowRow = tbody_Calendar.insertRow(); // 새로운 행 추가
    }
    const thismonth = nowMonth.getMonth();
    if (thismonth !== firstDate.getMonth()) {
      nowColumn.style.color = "#C2C2C2";
    }

    if (nowDay < today) {
      // 지난날인 경우
      nowColumn.className = "pastDay";
    } else if (
      nowDay.getFullYear() == today.getFullYear() &&
      nowDay.getMonth() == today.getMonth() &&
      nowDay.getDate() == today.getDate()
    ) {
      // 오늘인 경우
      nowColumn.className = "today";
      nowColumn.onclick = function () {
        choiceDate(this);
      };
    } else {
      // 미래인 경우
      nowColumn.className = "futureDay";
      nowColumn.onclick = function () {
        choiceDate(this);
      };
    }
  }
}

// calendar 함수에서 날짜를 선택해서 choiceDay class 부여 및 타임테이블 항상 초기화
function choiceDate(nowColumn) {
  const choiceDayElements = document.getElementsByClassName("choiceDay");

  if (choiceDayElements.length > 0) {
    choiceDayElements[0].classList.remove("choiceDay");
  }

  nowColumn.classList.add("choiceDay");
  reservation.day = parseInt(nowColumn.innerText);
  timeTableshow();
  const selectstartdate = document.querySelector(".start-date");
  const selectenddate = document.querySelector(".end-date");
  selectstartdate.innerText = `2023.${reservation.month}.${reservation.day}`;
  selectenddate.innerText = `2023.${reservation.month}.${reservation.day}`;

  //   timetable();
}

function prevCalendar() {

    console.log(reservation);
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() - 1,
    nowMonth.getDate()
  );
  buildCalendar();
}

function nextCalendar() {

  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() + 1,
    nowMonth.getDate()
  );
  buildCalendar();
}

function leftPad(value) {
  return value < 10 ? "0" + value : value;
}

const reservationBtn = document.querySelector('.reservation-btn');
reservationBtn.addEventListener('click', () => {
    reservationSubmit();
})

function reservationSubmit() {
    const requestBody = {
        date: `${reservation.year}-${reservation.month}-${reservation.day}`,
        startTime: reservation.starttime,
        endTime: reservation.endtime
    };

    const accessToken = localStorage.getItem("Access-Token");
    const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json' // JSON 형식으로 보내는 것을 명시
    });

    const config = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody) // JSON 문자열로 변환하여 요청 본문에 추가
    };

    fetch(`http://52.63.140.248:8080/api/reservations/${reservation.serviceId}`, config)
    .then(response => response.json())
    .then(data => {
       console.log(data);
       const url = `http://52.63.140.248/web/html/Completereserve.html`;
        window.location.href = url;
    })
    .catch(error => {
      console.error('에러 발생:', error);
    });
}