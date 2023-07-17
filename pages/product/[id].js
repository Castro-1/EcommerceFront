import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import WhiteBox from "@/components/WhiteBox";
import { styled } from "styled-components";
import ProductImages from "@/components/ProductImages";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from "@/components/FlyingButton";
import ProductReviews from "@/components/ProductReviews";
import Footer from "@/components/Footer";

const ColWrapper = styled.div`
  display: grid;
  & > div {
    margin-top: 0;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
`;

export default function ProductPage({ product }) {
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.name}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <FlyingButton
                primary="true"
                _id={product._id}
                src={product.images[0]}
              >
                <CartIcon />
                Add to cart
              </FlyingButton>
            </PriceRow>
          </div>
        </ColWrapper>
        <ProductReviews product={product} />
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
