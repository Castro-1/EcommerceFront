import { styled } from "styled-components";
import { primary } from "@/lib/Colors";
import OriginalFlyingButton from "react-flying-item";
import { ButtonStyle } from "./Button";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle}
  }
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  return (
    <FlyingButtonWrapper
      main={props.main}
      white={props.white}
      primary={props.primary}
      outline={props.outline}
      size={props.size}
      onClick={() => addProduct(props._id)}
    >
      <OriginalFlyingButton
        {...props}
        targetTop={"5%"}
        targetLeft={"95%"}
        flyingItemStyling={{
          width: "auto",
          height: "auto",
          maxHeight: "50px",
          maxWidth: "50px",
          borderRadius: 0,
        }}
      ></OriginalFlyingButton>
    </FlyingButtonWrapper>
  );
}
