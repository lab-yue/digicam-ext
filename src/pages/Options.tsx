import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Settings from "../components/Settings";
import Sidebar from "../components/Sidebar";
import { defaultOptions, Preset } from "../helpers/options";
import store from "../helpers/store";

const Flex = styled.div`
  position: relative;
  display: flex;
  margin: 30px 0;
`;
const Main = styled.main`
  flex-flow: 1;
  padding: 30px;
`;

export default function Options() {
  const [active, setActive] = useState(-1);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [indicator, setIndicator] = useState({
    text: "",
    typing: false,
  });

  useEffect(() => {
    const initData = async () => {
      const data = await store.getPresets();
      setPresets(data);
    };
    initData();
  }, []);

  const set = (newPresets: Preset[]) => {
    setPresets(newPresets);
    store.setPresets(newPresets);

    // fake throttle indicator
    if (!indicator.typing) {
      let isTyping;
      clearTimeout(isTyping);
      setIndicator({ text: "入力中...", typing: true });

      isTyping = setTimeout(() => {
        const time = new Date().toTimeString().split(" ")[0];
        setIndicator({
          typing: false,
          text: `${time}
           保存しました`,
        });
      }, 1000);
    }
  };

  const handleSelect = (index: number) => {
    setActive(index);
  };

  const handleChange = (p: Preset) => {
    const clone = [...presets];
    clone[active] = p;
    set(clone);
  };

  const handleDelete = () => {
    handleSelect(-1);
    const clone = [...presets];
    clone.splice(active, 1);
    set(clone);
  };
  const showSettings = !!presets.length && active !== -1;

  const createNewPreset = () => {
    set([...presets, defaultOptions]);
  };

  const presetNames = Object.values(presets).map((p) => p.name);

  return (
    <Flex>
      <Sidebar
        active={active}
        status={indicator.text}
        items={presetNames}
        onSelect={handleSelect}
        onCreate={createNewPreset}
      />
      <Main>
        {showSettings && (
          <Settings
            preset={presets[active]}
            onChange={(e) => handleChange(e)}
            handleDelete={handleDelete}
          />
        )}
      </Main>
    </Flex>
  );
}
