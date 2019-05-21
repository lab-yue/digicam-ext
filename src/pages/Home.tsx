import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { questions } from "../helpers/options";
import store from "../helpers/store";
const HomeLayout = styled.div`
  background-color: #333;
  padding: 10px;
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;
const Button = styled.button`
  margin-bottom: 1rem;
  font-size: 1.4rem;
  display: block;
  width: 100%;
  height: 60%;
  cursor: pointer;
  border: 0;
  color: #000;
  transition: 0.3s all ease-in-out;
  box-shadow: 0 0 10px #000;
  background-color: #eee;

  &:hover {
    background-color: #20b2aa;
  }
  &:active {
    background-color: #03a9f4;
    transform: translateY(3px);
  }
  &:focus {
    outline: none;
  }
`;

const OptionButton = styled.button`
  display: inline-block;
  color: #fff;
  font-size: 20px;
  border: 2px solid #eee;
  border-bottom: 5px solid #ccc;
  border-radius: 10px;
  margin: 10px;
  padding: 5px;
  transition: 0.3s all cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;
  background-color: transparent;
  &:hover {
    background-color: #555;
  }
  &:active {
    border-bottom: 3px solid #ccc;
  }
`;
export default function Home() {

  const openOptions = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL("options.html"));
    }
  };

  const [presets, setPresets] = useState<Preset[]>([]);

  useEffect(() => {
    store.initPresets();
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

    const preset = {...presets[i]};

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
        code: "window.injectedPreset = " + JSON.stringify(presets[i]),
      },
      () => chrome.tabs.executeScript({ file: "inject.js" }),
    );
  };

  return (
    <HomeLayout>
      {presets.map((preset, i) => (
        <Button key={`button-${i}`} onClick={() => runInject(i)}>
          {preset.name}
        </Button>
      ))}
      <OptionButton onClick={openOptions}>options</OptionButton>
    </HomeLayout>
  );
}
