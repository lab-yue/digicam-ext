import styled from "@emotion/styled";
import React from "react";

const SidebarContainer = styled.aside`
  width: 20%;
  max-width: 200px;
  padding: 30px;
  border-right: 1px solid #eee;
  position: relative;
`;

const Sticky = styled.div`
  position: sticky;
  top: 30px;
  max-height: 75vh;
`;

const PresetList = styled.ul`
  transition: 0.5s all ease-in-out;
  color: #000;
  list-style: none;
  padding: 0;
  margin-top: 0;
  text-align: left;
`;
interface PresetProps {
  active: boolean;
}
const Preset = styled.li<PresetProps>`
  transition: 0.3s all ease-in-out;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? "#ddd" : "")};
  &:hover {
    background-color: ${(props) => (props.active ? "#ddd" : "#eee")};
  }
`;

const PresetText = styled.span`
  padding: 3px 10px;
  display: block;
  color: #000;
  font-size: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const AddNew = styled(PresetText)`
  transition: 0.3s all ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

const Indicator = styled.span`
  position: fixed;
  white-space: pre-line;
  bottom: 2rem;
  color: #888;
  z-index: 10;
`;

const SectionTitle = styled.h3`
  margin-bottom: 0.4rem;
`;
export type SidebarSelectEventType = "preset" | "calendar";

export type SidebarSelectEvent =
  | {
      type: "preset";
      item: number;
    }
  | {
      type: "calendar";
    };

interface SidebarProps {
  items: string[];
  showType: SidebarSelectEventType;
  status: string;
  active: number;
  onSelect(e: SidebarSelectEvent): void;
  onCreate(): void;
}

export default function Sidebar({
  active,
  showType,
  status,
  items,
  onSelect,
  onCreate,
}: SidebarProps) {
  return (
    <SidebarContainer>
      <Sticky>
        <SectionTitle>カレンダー</SectionTitle>
        <PresetList>
          <Preset active={showType === "calendar"}>
            <PresetText onClick={() => onSelect({ type: "calendar" })}>
              設定
            </PresetText>
          </Preset>
        </PresetList>
        <SectionTitle>プリセット</SectionTitle>
        <PresetList>
          {items.map((preset, i) => (
            <Preset active={active === i} key={`preset-${i}`}>
              <PresetText onClick={() => onSelect({ type: "preset", item: i })}>
                {preset}
              </PresetText>
            </Preset>
          ))}
        </PresetList>
        <AddNew onClick={onCreate}>+</AddNew>
      </Sticky>
      <Indicator>{status}</Indicator>
    </SidebarContainer>
  );
}
