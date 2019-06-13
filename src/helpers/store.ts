import { Calendar } from "../components/CalendarSetting";
import { defaultOptions, Preset } from "./options";
async function getPresets() {
  // if (!chrome || !chrome.storage) {
  //  console.log("???");
  //  return [defaultOptions];
  // }
  return new Promise<Preset[]>((resolve, reject) => {
    chrome.storage.sync.get(["init"], (init) => {
      console.log({ init });
      if (Object.keys(init).length === 0) {
        const initPreset: Preset = {
          ...defaultOptions,
          name: "特にありません",
        };
        const enAnswer = "Nothing in particular";
        const enInitPreset: Preset = {
          ...defaultOptions,
          name: enAnswer,
          text1: enAnswer,
          text2: enAnswer,
        };
        const initPresets = [initPreset, enInitPreset];
        chrome.storage.sync.set({
          presets: initPresets,
          init: "done",
        });

        resolve(initPresets);
        return;
      }

      chrome.storage.sync.get(["presets"], (res) => {
        if (!res) {
          reject(new Error("no data!"));
        }
        resolve(res.presets || ([] as Preset[]));
      });
    });
  });
}

function setPresets(presets: Preset[]) {
  // if (!chrome || !chrome.storage) {
  //  return;
  // }
  chrome.storage.sync.set({ presets });
}

async function getCalendar() {
  return new Promise<Calendar>((resolve, reject) => {
    chrome.storage.sync.get(["calendar"], (res) => {
      if (!res) {
        reject(new Error("no calendar data!"));
      }
      resolve(res.calendar || { start: "2019-6-10", index: 80 });
    });
  });
}

function setCalendar(calendar: Calendar) {
  // if (!chrome || !chrome.storage) {
  //  return;
  // }
  chrome.storage.sync.set({ calendar });
}

export default {
  getPresets,
  setPresets,
  getCalendar,
  setCalendar,
};
