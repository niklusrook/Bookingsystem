  let isCalendarActive = true;

  const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span"),
    gobackIcon = document.querySelectorAll(".backicons span");

  let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

  const months = [
    "Januar",
    "Februar",
    "Mars",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  const bindLiClickEvents = () => {
    let allLiTags = document.querySelectorAll('.days li');

    for (let i = 0; i < allLiTags.length; i++) {
      allLiTags[i].addEventListener('click', function () {
        if (!this.classList.contains('inactive')) {
          document.querySelector('.days li.active')?.classList.remove('active');
          this.classList.add('active');
          const selectedDateElement = document.querySelector('.container3.hide .selected-date');
          const day = this.textContent;
          const month = months[currMonth];
          const year = currYear;
          selectedDateElement.textContent = `${month} ${day}, ${year}`;

          document.querySelector('.container3.hide').classList.remove('hide');
          document.querySelector('.container2:not(.hide)').classList.add('hide');

          isCalendarActive = false; // Set the state variable to false when entering the timetable view
        }
      });

      allLiTags[i].addEventListener('mouseover', function () {
        if (this.classList.contains('inactive')) {
          this.setAttribute('title', 'Utilgjengelig');
        } else {
          const day = this.textContent;
          const month = months[currMonth];
          const year = currYear;
          this.setAttribute('title', `${month} ${day}, ${year}`);
        }
      });

      allLiTags[i].addEventListener('mouseout', function () {
        this.removeAttribute('title');
      });
    }

    let firstActiveDay = document.querySelector('.days li:not(.inactive)');
    if (firstActiveDay) {
      firstActiveDay.style.fontWeight = '900';
    }
  };

  const prevSectionIcon = document.getElementById("prev_button");
  prevSectionIcon.addEventListener("click", function () {
    document.querySelector('.container3').classList.add('hide');
    document.querySelector('.container2').classList.remove('hide');

    isCalendarActive = true; // Set the state variable to true when returning to calendar view
  });

  const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
      lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
      lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
      lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(),
      todayDate = new Date(),
      todayDayOfWeek = todayDate.getDay();

    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      let day = new Date(currYear, currMonth, i);
      let isToday = i === todayDate.getDate() && currMonth === todayDate.getMonth()
        && currYear === todayDate.getFullYear() ? "today" : "";
      let isBeforeToday = day < todayDate || day.getDay() === 0 ? "inactive" : "";
      liTag += `<li class="${isBeforeToday} ${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
    bindLiClickEvents();
  };
  renderCalendar();

  prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
      if (!isCalendarActive) return;

      currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

      if (currMonth < 0 || currMonth > 11) {
        date = new Date(currYear, currMonth, new Date().getDate());
        currYear = date.getFullYear();
        currMonth = date.getMonth();
      } else {
        date = new Date();
      }
      renderCalendar();
    });
  });
