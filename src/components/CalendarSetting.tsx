import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import store from "../helpers/store";
import OptionTitle from "./OptionTitle";
const Sub = styled.span`
  color: #aaa;
  font-size: 0.8rem;
  padding: 0 10px;
`;
const Info = styled.p`
  background-color: cadetblue;
  padding: 5px;
  color: #eee;
  border-radius: 10px;
`;
const InfoNumber = styled.strong`
  color: #fff;
  margin-right: 1rem;
`;

import InputArea from "./InputArea";

export interface Calendar {
  start: string;
  index: number | undefined;
}
type CalendarSettingProps = {
  updateIndicator(): void;
};
export default function CalendarSetting({
  updateIndicator
}: CalendarSettingProps) {
  const [calendar, setCalendar] = useState<Calendar>({
    start: "",
    index: undefined
  });
  useEffect(() => {
    const initData = async () => {
      const startDate = await store.getCalendar();
      setCalendar(startDate);
    };
    initData();
  }, []);

  const onChange = (c: Calendar) => {
    setCalendar(c);
    store.setCalendar(c);
    updateIndicator();
  };

  return (
    <>
      <OptionTitle>Calendar Options</OptionTitle>
      <h2>クオーター最初日</h2>
      <InputArea
        placeholder="2019-6-10"
        value={calendar.start}
        onChange={e => onChange({ ...calendar, start: e.target.value })}
      />
      <h2>
        マジックナンバー<Sub>(テーブルのインデックス)</Sub>
      </h2>
      <Info>
        1Q: <InfoNumber>9</InfoNumber>2Q: <InfoNumber>80</InfoNumber>
      </Info>
      <InputArea
        placeholder="80"
        value={calendar.index}
        onChange={e =>
          onChange({
            ...calendar,
            index: e.target.value ? parseInt(e.target.value, 10) : undefined
          })
        }
      />
    </>
  );
}
