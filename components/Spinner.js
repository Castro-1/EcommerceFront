import { BounceLoader } from "react-spinners";
import { styled } from "styled-components";

const Wrapper = styled.div`
  ${(props) =>
    props.fullWidth
      ? `
      display: flex;
      justify-content: center;
   `
      : ``}
`;

export default function Spinner(props) {
  return (
    <Wrapper {...props}>
      <BounceLoader speedMultiplier={2} color={"#555"} />
    </Wrapper>
  );
}
