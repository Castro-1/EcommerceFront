import { styled } from "styled-components";
import StarOutline from "./icons/StarOutline";
import { useState } from "react";
import StarSolid from "./icons/StarSolid";

const StarsWrapper = styled.div`
  display: inline-flex;
  gap: 1px;
  height: 1.4rem;
  align-items: center;
`;
const StarWrapper = styled.button`
  height: 1.4rem;
  width: 1.4rem;
  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
`;

export default function StarsRating() {
  const [howMany, setHowMany] = useState(0);
  const five = [1, 2, 3, 4, 5];

  function handleStarClick(n) {
    setHowMany((prev) => {
      return prev === n ? 0 : n;
    });
  }

  return (
    <StarsWrapper>
      {five.map((num) => {
        return (
          <StarWrapper key={num} onClick={() => handleStarClick(num)}>
            {howMany >= num ? <StarSolid /> : <StarOutline />}
          </StarWrapper>
        );
      })}
    </StarsWrapper>
  );
}
