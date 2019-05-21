import styled from "@emotion/styled";
import React from "react";
import { Preset, questions } from "../helpers/options";
import InputArea from "./InputArea";
import Selector from "./Selector";
import TextArea from "./TextArea";

const DeleteButton = styled.button`
  display: inline-block;
  color: #fff;
  border: 2px solid #e91e63;
  border-bottom: 5px solid #444;
  border-radius: 10px;
  margin: 10px;
  font-size: 20px;
  padding: 5px;
  transition: 0.3s all cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;
  background-color: #e91e63;
  &:focus {
    outline: none;
  }
  &:active {
    border-bottom: 3px solid #444;
  }
`;

interface SettingsProps {
  preset: Preset;
  emit(p: Preset): void;
  handleDelete(): void;
}

export default function Settings({
  preset,
  emit,
  handleDelete,
}: SettingsProps) {
  if (!preset) { return <></>; }

  return (
    <>
      <h1>Options</h1>

      <h2>プリセットの名前</h2>

      <InputArea
        value={preset.name}
        onChange={(e) => emit({ ...preset, name: e.target.value })}
      />

      <h2>授業への参加状況について回答してください</h2>
      <Selector
        options={questions.q1}
        name="q1"
        focus={preset.q1}
        onChange={(q1) => emit({ ...preset, q1 })}
      />

      <h2>授業内容を理解できましたか?</h2>
      <Selector
        options={questions.q2}
        name="q2"
        focus={preset.q2}
        onChange={(q2) => emit({ ...preset, q2 })}
      />

      <h2>授業に興味を持てましたか?</h2>
      <Selector
        options={questions.q3}
        name="q3"
        focus={preset.q3}
        onChange={(q3) => emit({ ...preset, q3 })}
      />

      <h2>次回の授業に向けて準備するべきこと・学ぶべきことを理解しましたか?</h2>
      <Selector
        options={questions.q4}
        name="q4"
        focus={preset.q4}
        onChange={(q4) => emit({ ...preset, q4 })}
      />

      <h2>次回の授業に向けて準備するべきこと・学ぶべきことを理解しましたか?</h2>
      <TextArea
        value={preset.text1}
        onChange={(e) =>
          emit({ ...preset, text1: (e.target as HTMLTextAreaElement).value })
        }
      />

      <h2>今日の授業の良かった点、要望があれば、あげてください。</h2>
      <TextArea
        value={preset.text2}
        onChange={(e) =>
          emit({ ...preset, text2: (e.target as HTMLTextAreaElement).value })
        }
      />

      <h2>自動入力した後の操作</h2>
      <Selector
        options={questions.after}
        name="after"
        focus={preset.after}
        onChange={(after) => emit({ ...preset, after })}
      />
      <pre>
        <code>{JSON.stringify(preset, null, 4)}</code>
      </pre>
      <h2>プリセットを削除</h2>
      <DeleteButton onClick={() => handleDelete()}>Delete</DeleteButton>
    </>
  );
}
