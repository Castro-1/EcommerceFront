import { styled } from "styled-components";
import StarOutline from "./icons/StarOutline";
import { useState } from "react";
import StarSolid from "./icons/StarSolid";
import { primary } from "@/lib/Colors";

const StarsWrapper = styled.div`
  display: inline-flex;
  gap: 1px;
  height: 1.4rem;
  align-items: center;
`;
const StarWrapper = styled.button`
  ${(props) =>
    props.size === "md" &&
    `height: 1.4rem;
width: 1.4rem;`}
  ${(props) =>
    props.size === "sm" &&
    `height: 1rem;
width: 1rem;`}
  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  color: ${primary};
`;

export default function StarsRating({
  defaultHowMany = 0,
  onChange = () => {},
  size = "md",
}) {
  const five = [1, 2, 3, 4, 5];

  return (
    <StarsWrapper>
      {five.map((num) => {
        return (
          <StarWrapper size={size} key={num} onClick={() => onChange(num)}>
            {defaultHowMany >= num ? <StarSolid /> : <StarOutline />}
          </StarWrapper>
        );
      })}
    </StarsWrapper>
  );
}
