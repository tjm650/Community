import { Platform } from "react-native";
import { ADDRESS } from "./api";

function log() {
  // objects for better reabability
  // console.log that formats/indents

  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i];
    //stringify and indents object
    if (typeof arg === "object") {
      arg = JSON.stringify(arg, null, 2);
    }
    console.log(`[${Platform.OS}]`, arg);
  }
}

function formatTime(date) {
  if (date === null) {
    return "-";
  }
  const now = new Date();
  const s = Math.abs(now - new Date(date)) / 1000;

  //In Seconds
  if (s < 60) {
    return "now";
  }

  // Minutes
  if (s < 60 * 60) {
    const m = Math.floor(s / 60);
    return `${m}m ago`;
  }

  // Hours
  if (s < 60 * 60 * 24) {
    const h = Math.floor(s / (60 * 60));
    return `${h}h ago`;
  }

  // Days
  if (s < 60 * 60 * 24 * 7) {
    const d = Math.floor(s / (60 * 60 * 24));
    return `${d}d ago`;
  }

  // Weeks
  if (s < 60 * 60 * 24 * 7 * 4) {
    const w = Math.floor(s / (60 * 60 * 24 * 7));
    return `${w}w ago`;
  }
  // Months
  if (s < 60 * 60 * 24 * 7 * 4 * 12) {
    const m = Math.floor(s / (60 * 60 * 24 * 7 * 12));
    return `${m}m ago`;
  }
  // Years
  const y = Math.floor(s / (60 * 60 * 24 * 365));
  return `${y}y ago`;
}

function formatNotifTime(date) {
  if (date === null) {
    return "-";
  }
  const now = new Date();
  const s = Math.abs(now - new Date(date)) / 1000;

  //In Seconds
  if (s < 60) {
    return "now";
  }

  // Minutes
  if (s < 60 * 60) {
    const m = Math.floor(s / 60);
    return `${m === 1 ? m + " min" : m + " mins"}`;
  }

  // Hours
  if (s < 60 * 60 * 24) {
    const h = Math.floor(s / (60 * 60));
    return `${h === 1 ? h + " hour" : h + " hours"}`;
  }

  // Days
  if (s < 60 * 60 * 24 * 7) {
    const d = Math.floor(s / (60 * 60 * 24));
    return `${d === 1 ? d + " day" : d + " days"} `;
  }

  // Weeks
  if (s < 60 * 60 * 24 * 7 * 4) {
    const w = Math.floor(s / (60 * 60 * 24 * 7));
    return `${w === 1 ? w + " week" : w + " weeks"}`;
  }
  // Months
  if (s < 60 * 60 * 24 * 7 * 4 * 12) {
    const m = Math.floor(s / (60 * 60 * 24 * 7 * 12));
    return `${m === 1 ? m + " month" : m + " months"}`;
  }
  // Years
  const y = Math.floor(s / (60 * 60 * 24 * 365));
  return `${y === 1 ? y + " year" : y + " years"}`;
}

function CalendarTime(date) {
  if (date === null) {
    return "-";
  }

  const q = "2024-08-28T17:24:53.300025Z";
  const now = new Date();
  const time = new Date(date);
  const s = Math.abs(now - time) / 1000;
  var newDate = now.getTimezoneOffset(date);

  var hours = time.getHours(date); //current hours
  var min = time.getMinutes(date); //current minutes
  var months = time.getMonth(date); //current minutes
  var years = time.getFullYear(date); //current minutes
  var getDate = time.getDate(date); // current date

  // Hours
  if (s < 60 * 60 * 24) {
    if (min == "0") {
      return hours + ":" + "0" + min;
    }
    if (min == "1") {
      return hours + ":" + "0" + min;
    }
    if (min == "2") {
      return hours + ":" + "0" + min;
    }
    if (min == "3") {
      return hours + ":" + "0" + min;
    }
    if (min == "4") {
      return hours + ":" + "0" + min;
    }
    if (min == "5") {
      return hours + ":" + "0" + min;
    }
    if (min == "6") {
      return hours + ":" + "0" + min;
    }
    if (min == "7") {
      return hours + ":" + "0" + min;
    }
    if (min == "8") {
      return hours + ":" + "0" + min;
    }
    if (min == "9") {
      return hours + ":" + "0" + min;
    }
    return hours + ":" + min;
  }

  // // Yesterday
  // if (s < 60 * 60 * 24 * 2) {
  //   const d = Math.floor(s / (60 * 60 * 24));
  //   return `${d} day `;// "yest" + "⁓" + hours + ":" + min;
  // }

  // Days
  if (s < 60 * 60 * 24 * 7) {
    const d = Math.floor(s / (60 * 60 * 24));

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[time.getDay()];

    return day; //`${d}d`;
  }

  // Weeks
  if (s < 60 * 60 * 24 * 7 * 4) {
    const w = Math.floor(s / (60 * 60 * 24 * 7));
    return `${w}w`;
  }
  // Months
  if (s < 60 * 60 * 24 * 7 * 4 * 12) {
    const m = Math.floor(s / (60 * 60 * 24 * 7 * 12));
    if (months == "0") {
      return getDate + " " + "Jan";
    }
    if (months == "1") {
      return getDate + " " + "Feb";
    }
    if (months == "2") {
      return getDate + " " + "Mar";
    }
    if (months == "3") {
      return getDate + " " + "Apr";
    }
    if (months == "4") {
      return getDate + " " + "May";
    }
    if (months == "5") {
      return getDate + " " + "Jun";
    }
    if (months == "6") {
      return getDate + " " + "July";
    }
    if (months == "7") {
      return getDate + " " + "Aug";
    }
    if (months == "8") {
      return getDate + " " + "Sept";
    }
    if (months == "9") {
      return getDate + " " + "Oct";
    }
    if (months == "10") {
      return getDate + " " + "Nov";
    }
    if (months == "11") {
      return getDate + " " + "Dec";
    }

    return getDate + " " + months;
  }

  // Years
  const y = Math.floor(s / (60 * 60 * 24 * 365));
  if (months == "0") {
    return "Jan" + " " + years;
  }
  if (months == "1") {
    return "Feb" + " " + years;
  }
  if (months == "2") {
    return "Mar" + " " + years;
  }
  if (months == "3") {
    return "Apr" + " " + years;
  }
  if (months == "4") {
    return "May" + " " + years;
  }
  if (months == "5") {
    return "Jun" + " " + years;
  }
  if (months == "6") {
    return "July" + " " + years;
  }
  if (months == "7") {
    return "Aug" + " " + years;
  }
  if (months == "8") {
    return "Sept" + " " + years;
  }
  if (months == "9") {
    return "Oct" + " " + years;
  }
  if (months == "10") {
    return "Nov" + " " + years;
  }
  if (months == "11") {
    return "Dec" + " " + years;
  }

  return months + " " + years;
}

function CalendarPostTime(date) {
  if (date === null) {
    return "-";
  }

  const q = "2024-08-28T17:24:53.300025Z";
  const now = new Date();
  const time = new Date(date);
  const s = Math.abs(now - time) / 1000;
  var newDate = now.getTimezoneOffset(date);

  var hours = time.getHours(date); //current hours
  var min = time.getMinutes(date); //current minutes
  var months = time.getMonth(date); //current minutes
  var years = time.getFullYear(date); //current minutes
  var getDate = time.getDate(date); // current date

  // // Hours
  // if (s < 60 * 60 * 24) {
  //   if (min == "0") {
  //     return hours + ":" + "0" + min;
  //   }
  //   if (min == "1") {
  //     return hours + ":" + "0" + min;
  //   }
  //   if (min == "2") {
  //     return hours + ":" + "0" + min;
  //   }
  //   if (min == "3") {
  //     return hours + ":" + "0" + min;
  //   }
  //   if (min == "4") {
  //     return hours + ":" + "0" + min;
  //   }
  //   if (min == "5") {
  //     return hours + ":" + "0" + min;
  //   }
  //   if (min == "6") {
  //     return hours + ":" + "0" + min;
  //   }
  //   if (min == "7") {
  //     return hours + ":" + "0" + min;
  //   }
  //   if (min == "8") {
  //     return hours + ":" + "0" + min;
  //   }
  //   if (min == "9") {
  //     return hours + ":" + "0" + min;
  //   }
  //   return hours + ":" + min;
  // }

  //In Seconds
  if (s < 60) {
    return `1s`;
  }

  // Minutes
  if (s < 60 * 60) {
    const m = Math.floor(s / 60);
    return `${m}m`;
  }

  // Hours
  if (s < 60 * 60 * 24) {
    const h = Math.floor(s / (60 * 60));
    return `${h}hr`;
  }

  // Days
  if (s < 60 * 60 * 24 * 7) {
    const d = Math.floor(s / (60 * 60 * 24));

    return `${d}d`;
  }

  // Weeks
  if (s < 60 * 60 * 24 * 7 * 4) {
    const w = Math.floor(s / (60 * 60 * 24 * 7));
    return `${w}w`;
  }
  // Months
  if (s < 60 * 60 * 24 * 7 * 4 * 12) {
    const m = Math.floor(s / (60 * 60 * 24 * 7 * 12));
    if (months == "0") {
      return getDate + " " + "Jan";
    }
    if (months == "1") {
      return getDate + " " + "Feb";
    }
    if (months == "2") {
      return getDate + " " + "Mar";
    }
    if (months == "3") {
      return getDate + " " + "Apr";
    }
    if (months == "4") {
      return getDate + " " + "May";
    }
    if (months == "5") {
      return getDate + " " + "Jun";
    }
    if (months == "6") {
      return getDate + " " + "July";
    }
    if (months == "7") {
      return getDate + " " + "Aug";
    }
    if (months == "8") {
      return getDate + " " + "Sept";
    }
    if (months == "9") {
      return getDate + " " + "Oct";
    }
    if (months == "10") {
      return getDate + " " + "Nov";
    }
    if (months == "11") {
      return getDate + " " + "Dec";
    }

    return getDate + " " + months;
  }

  // Years
  const y = Math.floor(s / (60 * 60 * 24 * 365));
  if (months == "0") {
    return "Jan" + " " + years;
  }
  if (months == "1") {
    return "Feb" + " " + years;
  }
  if (months == "2") {
    return "Mar" + " " + years;
  }
  if (months == "3") {
    return "Apr" + " " + years;
  }
  if (months == "4") {
    return "May" + " " + years;
  }
  if (months == "5") {
    return "Jun" + " " + years;
  }
  if (months == "6") {
    return "July" + " " + years;
  }
  if (months == "7") {
    return "Aug" + " " + years;
  }
  if (months == "8") {
    return "Sept" + " " + years;
  }
  if (months == "9") {
    return "Oct" + " " + years;
  }
  if (months == "10") {
    return "Nov" + " " + years;
  }
  if (months == "11") {
    return "Dec" + " " + years;
  }

  return months + " " + years;
}

function GetImage(url) {
  if (!url) {
    null;
    console.log("no url");
  }
  return {
    uri: "http://" + ADDRESS + url,
  };
}

function DateToday(dates) {
  // if (dates === null) {
  //   return today = new Date();
  // } else if (dates !== null) {
  //   return today = new Date(dates)
  // }
  const today = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = days[today.getDay()];

  const date = today.getDate();

  const month = months[today.getMonth()];

  const year = today.getFullYear().toString();
  let now =
    day.slice(0, 3) +
    " " +
    date +
    " " +
    month.slice(0, 3) +
    " " +
    year.slice(2, 4);

  return now;
}

const Countdown = (futureDate, setCountdown) => {
  const now = new Date();
  const val = new Date(futureDate);
  let diffInMs = val - now;
  // console.log("futureDate-utils-->", futureDate);
  // console.log("diffInMs--->", diffInMs);
  // console.log("now--->", now);

  if (diffInMs <= 0) {
    setCountdown("0");
    return;
  }

  // useEffect(() => {
  //   let interval;
  //   if (futureDate) {
  //     interval = setInterval(() => Countdown(), 1000);
  //   }
  //   return () => clearInterval(interval);
  // }, [futureDate]);

  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const daysHours = Math.floor((diffInMs / (1000 * 60 * 60 * 24)) * 24);
  const hours = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

  if (diffInMs >= 1000 * 60 * 60 * 24) {
    // setCountdown(
    //   `${days} days, ${hours.toString().padStart(2, "0")}:${minutes
    //     .toString()
    //     .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    // );
    setCountdown(`${daysHours.toString()} hr`);
    return;
  }

  if (diffInMs >= (1000 * 60 * 60 * 24) / (1000 * 60 * 60)) {
    // setCountdown(
    //   `${days} days, ${hours.toString().padStart(2, "0")}:${minutes
    //     .toString()
    //     .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    // );
    setCountdown(`${hours.toString()} hr`);
    return;
  }

  if (diffInMs >= (1000 * 60 * 60) / (1000 * 60)) {
    // setCountdown(
    //   `${days} days, ${hours.toString().padStart(2, "0")}:${minutes
    //     .toString()
    //     .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    // );
    setCountdown(`${minutes.toString()} min`);
    return;
  }

  if (diffInMs >= (1000 * 60) / 1000) {
    // setCountdown(
    //   `${days} days, ${hours.toString().padStart(2, "0")}:${minutes
    //     .toString()
    //     .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    // );
    setCountdown(`${seconds.toString()}s`);
    return;
  }
};

const Countdown2 = (futureDate, setCountdown) => {
  const now = new Date();
  const val = new Date(futureDate);
  let diffInMs = val - now;


  if (diffInMs <= 0) {
    setCountdown("0");
    return;
  }

  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const daysHours = Math.floor((diffInMs / (1000 * 60 * 60 * 24)) * 24);
  const hours = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

  if (diffInMs >= 1000 * 60 * 60 * 24) {
    console.log("days-->", days);
    setCountdown(
      `${days} ${days > 1 ? "days" : "day"}, ${hours
        .toString()
        .padStart(2, "0")} ${hours > 1 ? "hours" : "hour"} : ${minutes
        .toString()
        .padStart(2, "0")} ${minutes > 1 ? "minutes" : "minute"}`
    );
    return;
  }

  if (diffInMs >= (1000 * 60 * 60 * 24) / (1000 * 60 * 60)) {
    setCountdown(
      `${hours.toString().padStart(2, "0")} ${
        hours > 1 ? "hours" : "hour"
      } : ${minutes.toString().padStart(2, "0")} ${
        minutes > 1 ? "minutes" : "minute"
      }`  
    );
    return;
  }

  if (diffInMs >= (1000 * 60 * 60) / (1000 * 60)) {
    setCountdown(
      `${minutes.toString().padStart(2, "0")} ${
        minutes > 1 ? "minutes" : "minute"
      }`
    );
    return;
  }

  if (diffInMs >= (1000 * 60) / 1000) {
    setCountdown(`${seconds.toString().padStart(2, "0")} s`);
    return;
  }
};

const GetTime = (futureDate) => {
  const val = new Date(futureDate);

  if (futureDate === null) {
    return "-";
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September", 
    "October",
    "November",
    "December",
  ];

  const day = days[val.getDay()];
  const months = month[val.getMonth()]; //current minutes
  var getDate = val.getDate(futureDate); // current date
  var years = val.getFullYear(futureDate); //current minutes

  return ` ${day + " " + getDate + " " + months + " " + years}`;
};

const GetEndDateTime = (date) => {
  const val = new Date(date);

  if (date === null) {
    return "-";
  }

  var hours = val.getHours(date); //current hours
  var min = val.getMinutes(date); //current minutes

  if (min <= "9") {
    return hours + ":" + "0" + min;
  }

  if (min > "9") {
    return hours + ":" + min;
  }
};
 
export default {    
  log,
  formatTime,
  CalendarTime,
  GetImage,
  DateToday,
  formatNotifTime,
  CalendarPostTime,
  Countdown,
  Countdown2,
  GetTime,
  GetEndDateTime,
};
