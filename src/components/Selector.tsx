import styled from "@emotion/styled";
import React from "react";

const OptionInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
  display: none;
`;
interface OptionLabelProps {
  focus: boolean;
}

const OptionLabel = styled.label<OptionLabelProps>`
  display: inline-block;
  color: #000;
  border: 2px solid #9692af;
  border-bottom: 5px solid #444;
  border-radius: 10px;
  margin: 10px;
  padding: 5px;
  transition: 0.3s all cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;
  background-color: ${(props) => (props.focus ? "turquoise" : "transparent")};
  &:hover {
    background-color: ${(props) => (props.focus ? "turquoise" : "#d7eaea")};
  }
  &:active {
    border-bottom: 3px solid #444;
  }
`;

interface SelectorOption {
  [s: string]: string;
}

interface SelectorProps {
  name: string;
  options: SelectorOption;
  focus: string;
  onChange(value: string): void;
}

export default function Selector({
  name,
  options,
  focus,
  onChange,
}: SelectorProps) {
  return (
    <>
      <div onChange={(e) => onChange((e as any).target.value)}>
        {Object.entries(options).map(([option, value], i) => (
          <span key={`s-${i}`}>
            <OptionInput
              id={`${name}-${i}`}
              type="radio"
              value={value}
              name={name}
            />
            <OptionLabel focus={focus === value} htmlFor={`${name}-${i}`}>
              {option}
            </OptionLabel>
          </span>
        ))}

        <OptionInput id={`${name}-x`} type="radio" value={"-1"} name={name} />
        <OptionLabel focus={focus === "-1"} htmlFor={`${name}-x`}>
          ランダム
        </OptionLabel>
      </div>
    </>
  );
}
