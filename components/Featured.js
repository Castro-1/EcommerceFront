import Center from "./Center";
import { styled } from "styled-components";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import Button from "./Button";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import FlyingButton from "./FlyingButton";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.name}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={"/product/" + product._id}
                  white="true"
                  outline="true"
                >
                  Read more
                </ButtonLink>
                <FlyingButton
                  white="true"
                  _id={product._id}
                  src={product.images[0]}
                  onClick={addFeaturedToCart}
                >
                  <CartIcon />
                  Add to cart
                </FlyingButton>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img
              src="https://next-ecommerce-jecg.s3.amazonaws.com/1687444860586.png"
              alt="macbook"
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
