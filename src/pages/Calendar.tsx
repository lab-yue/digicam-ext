import * as json2csv from "json2csv";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { Calendar } from "../components/CalendarSetting";
import store from "../helpers/store";

export default function CalendarPopup() {
  const [calendar, setCalendar] = useState<Calendar>({ start: "", index: 0 });

  useEffect(() => {
    const initData = async () => {
      const data = await store.getCalendar();
      setCalendar(data);
    };
    initData();
  }, []);

  const runInject = () => {
    return new Promise<string>((resolve, reject) => {
      if (!chrome.tabs) {
        return;
      }

      chrome.tabs.executeScript(
        {
          code: "window.injectedProps = " + JSON.stringify(calendar)
        },
        () => {
          chrome.tabs.executeScript({ file: "calendar-inject.js" }, res => {
            if (!res) {
              reject(null);
            }
            resolve(res[0]);
          });
        }
      );
    });
  };

  const downloadCSV = async () => {
    const json_data = await runInject();
    const blob = new Blob([json2csv.parse(json_data)], {
      type: "text/plain"
    });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
      filename: `dhu-timetable-${calendar.start}.csv`,
      url
    });
  };

  return (
    <>
      <Button onClick={downloadCSV}>時間割表をダンロード</Button>
    </>
  );
}
