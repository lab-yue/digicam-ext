import styled from "@emotion/styled";
import React from "react";

const SidebarContainer = styled.aside`
  width: 20%;
  max-width: 200px;
  padding: 30px;
  border-right: 1px solid #eee;
`;

const Sticky = styled.div`
  position: sticky;
  top: 30px;
`;

const PresetList = styled.ul`
  transition: 0.5s all ease-in-out;
  color: #000;
  list-style: none;
  padding: 0;
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
`;

interface SidebarProps {
  items: string[];
  active: number;
  onSelect(item: number): void;
  onCreate(): void;
}

export default function Sidebar({
  active,
  items,
  onSelect,
  onCreate,
}: SidebarProps) {
  return (
    <SidebarContainer>
      <Sticky>
        <PresetList>
          {items.map((preset, i) => (
            <Preset active={active === i} key={`preset-${i}`}>
              <PresetText onClick={() => onSelect(i)}>{preset}</PresetText>
            </Preset>
          ))}
        </PresetList>
        <PresetText onClick={onCreate}>+</PresetText>
      </Sticky>
    </SidebarContainer>
  );
}
