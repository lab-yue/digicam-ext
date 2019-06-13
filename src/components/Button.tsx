import styled from "@emotion/styled";

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

export default Button;
