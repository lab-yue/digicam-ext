import styled from "@emotion/styled";
import React from "react";

const InputArea = styled.input`
  width: 100%;
  font-size:20px;
  padding:5px;
  border: 2px solid #eee;
  &:focus {
    outline: none;
    border: 2px solid cadetblue;
  }
`;

export default InputArea;
