import { defaultOptions, Preset } from "./options";

async function getPresets() {
  return new Promise<Preset[]>((resolve, reject) => {
    chrome.storage.sync.get(["init"], res => {
      console.log({ res });
      if (Object.keys(res).length === 0) {
        const initPreset: Preset = {
          ...defaultOptions,
          name: "特にありません"
        };
        const enAnswer = "Nothing in particular";
        const enInitPreset: Preset = {
          ...defaultOptions,
          name: enAnswer,
          text1: enAnswer,
          text2: enAnswer
        };
        const initPresets = [initPreset, enInitPreset];
        chrome.storage.sync.set({
          presets: initPresets,
          init: "done"
        });

        resolve(initPresets);
        return;
      }

      chrome.storage.sync.get(["presets"], res => {
        if (!res) {
          reject(new Error("no data!"));
        }
        resolve(res.presets || ([] as Preset[]));
      });
    });
  });
}

function setPresets(presets: Preset[]) {
  chrome.storage.sync.set({ presets });
}

export default {
  getPresets,
  setPresets
};
