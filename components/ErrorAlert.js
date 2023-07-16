import { styled } from "styled-components";
import css from "styled-jsx/css";
import ErrorIcon from "./icons/ErrorIcon";

const Alert = styled.div`
  @keyframes disappear {
    0% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  background-color: transparent;
  border: 2px solid red;
  color: red;
  padding: 5px;
  border-radius: 5px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 5px;
  opacity: 0;
  ${(props) =>
    props.showAlert &&
    css`
      animation-name: disappear;
      animation-duration: 5s;
    `}
`;

export default function ErrorAlert({ content, showAlert }) {
  return (
    <Alert showAlert={showAlert}>
      <ErrorIcon /> {content}
    </Alert>
  );
}
