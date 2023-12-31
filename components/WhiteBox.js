import { styled } from "styled-components";

const WhiteBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  margin-top: 40px;
  padding: 30px;
  ${(props) => (props.small ? `max-height: 300px;` : ``)}
`;

export default WhiteBox;
