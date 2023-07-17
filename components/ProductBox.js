import { styled } from "styled-components";
import Link from "next/link";
import FlyingButton from "./FlyingButton";
import HeartOutlineIcon from "./icons/HeartOulineIcon";
import { useState } from "react";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";
import { useSession } from "next-auth/react";
import ErrorAlert from "./ErrorAlert";

const ProductWrapper = styled.div`
  button {
    width: 100%;
    justify-content: center;
  }
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

const WishlistButton = styled.button`
  border: 0;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  cursor: pointer;
  ${(props) => (props.wished ? `color: red;` : `color:black;`)}
  svg {
    width: 16px;
  }
`;

const AlertContainer = styled.div`
  position: absolute;
  z-index: 10;
  & > div {
    font-size: 12px;
    margin: 5px;
    padding: 0px 2px;
    div {
      width: 16px;
    }
  }
`;

export default function ProductWhiteBox({
  _id,
  name,
  price,
  images,
  wished = false,
  onRemoveFromWishlist = () => {},
}) {
  const url = "/product/" + _id;
  const { data: session } = useSession();

  const [isWished, setIsWished] = useState(wished || false);
  const [showAlert, setShowAlert] = useState(false);

  function addToWishlist(ev) {
    ev.preventDefault();
    if (!session) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5100);
      return;
    }
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios
      .post("/api/wishlist", {
        product: _id,
      })
      .then(() => {});
    setIsWished(nextValue);
  }

  return (
    <ProductWrapper>
      {showAlert && (
        <AlertContainer>
          <ErrorAlert showAlert={showAlert} content="Login for wishlist" />
        </AlertContainer>
      )}
      <WhiteBox href={url}>
        <div>
          <WishlistButton wished={isWished} onClick={addToWishlist}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </WishlistButton>
          <img src={images[0]} alt="product image" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{name}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <FlyingButton primary="true" src={images[0]} _id={_id}>
            Add to cart
          </FlyingButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
