import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { Preset, questions } from "../helpers/options";
import store from "../helpers/store";

export default function FS() {
  const [presets, setPresets] = useState<Preset[]>([]);

  useEffect(() => {
    const initData = async () => {
      const data = await store.getPresets();
      setPresets(data);
    };
    initData();
  }, []);

  const runInject = (i: number) => {
    if (!chrome.tabs) {
      return;
    }

    const preset = { ...presets[i] };

    Object.entries(preset).map(([k, v]) => {
      if (v === "-1") {
        // @ts-ignore
        const origin = questions[k];
        if (origin) {
          const values = Object.values(origin);
          // @ts-ignore
          preset[k] = values[Math.floor(Math.random() * values.length)];
        }
      }
    });

    chrome.tabs.executeScript(
      {
        code: "window.injectedProps = " + JSON.stringify(preset),
      },
      () => {
        chrome.tabs.executeScript({ file: "fs-inject.js" });
        window.close();
      },
    );
  };

  return (
    <>
      {presets.map((preset, i) => (
        <Button key={`button-${i}`} onClick={() => runInject(i)}>
          {preset.name}
        </Button>
      ))}
    </>
  );
}
