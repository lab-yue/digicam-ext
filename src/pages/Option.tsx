import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Settings from "../components/Settings";
import Sidebar from "../components/Sidebar";
import { defaultOptions, Preset } from "../helpers/options";
import store from "../helpers/store";

const Flex = styled.div`
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

  const presetNames = Object.values(presets).map(p => p.name);

  return (
    <Flex>
      <Sidebar
        active={active}
        items={presetNames}
        onSelect={handleSelect}
        onCreate={createNewPreset}
      />
      <Main>
        {showSettings && (
          <Settings
            preset={presets[active]}
            onChange={e => handleChange(e)}
            handleDelete={handleDelete}
          />
        )}
      </Main>
    </Flex>
  );
}
