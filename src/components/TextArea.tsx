import styled from "@emotion/styled";

const TextArea = styled.textarea`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  border: 2px solid #eee;
  font-size: 16px;
  min-height: 200px;
  &:focus {
    outline: none;
    border: 2px solid cadetblue;
  }
`;
export default TextArea;
