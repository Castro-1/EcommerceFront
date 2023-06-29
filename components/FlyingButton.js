import { styled } from "styled-components";
import { ButtonStyle } from "./Button";
import { useContext, useEffect, useRef } from "react";
import { CartContext } from "./CartContext";

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle}
  }
  @keyframes fly {
    100% {
      top: 0;
      left: 90%;
      opacity: 0;
      display: none;
    }
  }
  @media screen and (min-width: 768px) {
    @keyframes fly {
      100% {
        top: 0;
        left: 70%;
        opacity: 0;
        display: none;
      }
    }
  }
  img {
    max-width: 50px;
    max-height: 50px;
    opacity: 1;
    position: fixed;
    display: none;
    z-index: 4;
    animation: fly 1s;
    border-radius: 10px;
  }
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  const imgRef = useRef();
  function sendImageToCart(ev) {
    imgRef.current.style.display = "inline-block";
    imgRef.current.style.left = ev.clientX - 50 + "px";
    imgRef.current.style.top = ev.clientY - 50 + "px";
    setTimeout(() => {
      imgRef.current.style.display = "none";
    }, 1000);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imgRef.current?.closest("div[data-sr-id]");
      if (reveal?.style.opacity === "1") {
        reveal.style.transform = "none";
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <FlyingButtonWrapper
        main={props.main}
        white={props.white}
        primary={props.primary}
        outline={props.outline}
        size={props.size}
        onClick={() => addProduct(props._id)}
      >
        <img ref={imgRef} src={props.src} alt="" />
        <button {...props} onClick={sendImageToCart}></button>
      </FlyingButtonWrapper>
    </>
  );
}
