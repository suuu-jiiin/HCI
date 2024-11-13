const checkboxes = document.querySelectorAll('input[type="checkbox"].activity');

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('input[type="checkbox"].activity:checked').length;
        if (checkedCount > 2) {
            checkbox.checked = false; // Uncheck the current box if the limit is exceeded
            swal({
              icon: "error",
              content: {
                  element: "p",
                  attributes: {
                      innerHTML: "최대 두 개만 선택할 수 있어요",
                  }
              }
          });
        }
    });
});


const checkboxes_weather = document.querySelectorAll('input[type="checkbox"].weather');

checkboxes_weather.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        // Count how many checkboxes are currently checked
        const checkedCount_weather = document.querySelectorAll('input[type="checkbox"].weather:checked').length;
    
        // If more than 2 checkboxes are selected, uncheck the latest one and show an alert
        if (checkedCount_weather > 2) {
            checkbox.checked = false; // Uncheck the current checkbox
            swal({
              icon: "error",
              content: {
                  element: "p",
                  attributes: {
                      innerHTML: "최대 두 개만 선택할 수 있어요",
                  }
              }
          });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const month = params.get("month");
  const day = params.get("day");
  let dayOfWeek = params.get("dayofweek");
  let dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  dayOfWeek = dayNames[dayOfWeek];

  if (month && day && dayOfWeek) {
      const dateText = `${month}월 ${day}일 (${dayOfWeek})`;
      const view9Element = document.querySelector(".upper_icon .diary_date");
      if (view9Element) {
        view9Element.textContent = dateText;
      } else {
        console.error("diary_date not found");
      }
    } else {
      console.error("Date parameters are missing in the URL");
    }
});
      
document.getElementById('saveButton').addEventListener('click', function() {
  // 선택된 "오늘의  활동"
  const selectedActivities = Array.from(document.querySelectorAll('input[type="checkbox"].activity:checked'))
    .map((checkbox) => checkbox.value);
  
  // 선택된 "오늘의  날씨"
  const selectedWeather = Array.from(document.querySelectorAll('input[type="checkbox"].weather:checked'))
    .map((checkbox) => checkbox.value);

  // 작성된 "오늘의 일기"
  const diaryContent = document.querySelector('.diary_text').textContent.trim();

  // Prepare data for Django
  const data = {
    activities: selectedActivities,
    weather: selectedWeather,
    diary: diaryContent,
  };

  // Fetch 이용해서 장고에 data 옮기기
  // '/save-diary/'는 Django의 url
  fetch('/save-diary/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': '{{ csrf_token }}'  // POST 요청에 신뢰할 수 있는 출처에서 온 것임을 보장해주는 token
    },
    body: JSON.stringify(data) // data가JSON형식으로 변환되어 Django 서버로 전송
  })
  .then(response => response.json()) // Django에서 요청을 처리한 후 JSON 응답 보내도록 설정
  .then(data => {
    if (data.success) {
      alert('Data saved successfully!');
    } else {
      alert('Failed to save data.');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

function confirmExit() {
  swal({
      title: "편집한 내용이 저장되지 않았어요.",
      text: "정말 나가시는 거예요? 🥹",
      icon: "warning",
      buttons: {
          cancel: "취소",
          confirm: {
              text: "확인",
              value: true,
              visible: true,
              className: "btn-danger",
              closeModal: true
          }
      }
  }).then((isConfirm) => {
      if (isConfirm) {
          const params = new URLSearchParams(window.location.search);
          const year = params.get('year');
          const month = params.get('month');
          const day = params.get('day');
          window.location.href = `../main/main.html?year=${year}&month=${month}&day=${day}`;
      }
  });
}

function clearPlaceholder(element) {
    if (element.textContent === "내용을 입력해주세요") {
        element.textContent = ""; // placeholder 제거
    }
}
    
function restorePlaceholder(element) {
    if (element.textContent.trim() === "") {
        element.textContent = "내용을 입력해주세요"; // placeholder 복원
    }
}