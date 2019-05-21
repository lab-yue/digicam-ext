import { defaultOptions, Preset } from "./options";

function initPresets() {
  const initPreset: Preset = { ...defaultOptions, name: "特にありません" };
  const enAnswer = "Nothing in particular";
  const enInitPreset: Preset = {
    ...defaultOptions,
    name: enAnswer,
    text1: enAnswer,
    text2: enAnswer,
  };

  // if (!chrome.storage) {
  //  if (localStorage.getItem("init")) {
  //    return;
  //  }
  //  localStorage.setItem("presets", JSON.stringify([initPreset, enInitPreset]));
  //  localStorage.setItem("init", "yes");
  //  return;
  // }

  chrome.storage.sync.get(["init"], (res) => {
    if (!!res && !!res.init) {
      chrome.storage.sync.set({ presets: [initPreset, enInitPreset] });
      chrome.storage.sync.set({ init: "yes" });
    }
  });
}

async function getPresets() {
  // if (!chrome.storage) {
  //  return JSON.parse(localStorage.getItem("presets") || "[]");
  // }

  return new Promise<Preset[]>((resolve, reject) => {
    chrome.storage.sync.get(["presets"], (res) => {
      if (!res) { reject(new Error("no data!")); }
      // console.log('Promise>>>')
      // console.log(res.presets);
      // console.log('<<<')
      resolve(res.presets || ([] as Preset[]));
    });
  });
}

function setPresets(presets: Preset[]) {
  // if (!chrome.storage) {
  //  localStorage.setItem("presets", JSON.stringify(presets));
  //  return;
  // }
  // console.log(presets);
  chrome.storage.sync.set({ presets });
}

export default {
  initPresets,
  getPresets,
  setPresets,
};
