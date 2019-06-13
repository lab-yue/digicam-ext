// @ts-ignore
const start = window.injectedProps.start || "2019-6-10";
// @ts-ignore
const tableIndex = window.injectedProps.index || 80;

const timeMap = {
  1: ["08:40 AM", "10:10 AM"],
  2: ["10:20 AM", "11:50 AM"],
  3: ["12:40 PM", "14:10 PM"],
  4: ["14:20 PM", "15:50 PM"],
  5: ["16:00 PM", "17:30 PM"],
  6: ["17:40 PM", "19:10 PM"]
};

const ja = ["日", "月", "火", "水", "木", "金", "土"];

type TimeMap = typeof timeMap;
type Time = keyof TimeMap;

interface Lecture {
  day: number;
  title: string;
  lecturer: string;
  time: number;
  classroom: string;
}

interface CalendarEvent {
  Subject: string;
  "Start Date": string;
  "Start Time"?: string;
  "End Date"?: string;
  "End Time"?: string;
  "All Day Event"?: boolean;
  Description?: string;
  Location?: string;
  Private?: boolean;
}

const frame = document.querySelectorAll("frame")[2].contentWindow as Window;
const table = frame.document.querySelectorAll("table")[tableIndex]; // 9 for 1Q | 80 for 2Q
const rows = Array.from(
  (table.querySelector("tbody") as HTMLTableSectionElement).children
);
let all: Lecture[] = [];

rows.map((row, time) => {
  const cells = Array.from(row.children) as HTMLElement[];
  cells.map((cell, day) => {
    const hasClass = cell.style.backgroundColor === "white";
    if (hasClass) {
      const info = cell.innerText.split("\n");
      const title = info[0];
      const lecturer = info[2];
      const classroom = info[5];
      Array(8)
        .fill(0)
        .map((_, i) => {
          all.push({
            day: day + i * 7,
            title,
            lecturer,
            time,
            classroom
          });
        });
    }
  });
});
const getDate = (days: number) => {
  const result = new Date(start);
  result.setDate(result.getDate() - 1 + days);
  return result;
};

const toGoogleEvent = (l: Lecture) => {
  const time = timeMap[l.time as keyof TimeMap];
  const date = getDate(l.day)
    .toLocaleString()
    .split(",")[0];
  return {
    Subject: l.title,
    "Start Time": time[0],
    "End Time": time[1],
    "Start Date": date,
    "End Date": date,
    Description: l.lecturer,
    Location: l.classroom
  };
};
const data: CalendarEvent[] = all.map(toGoogleEvent);
// return
// @ts-ignore
data;
