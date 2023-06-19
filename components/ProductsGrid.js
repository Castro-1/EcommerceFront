import ProductBox from "./ProductBox";
import { styled } from "styled-components";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

export default function ProductsGrid({ products }) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product) => {
          return <ProductBox key={product._id} {...product} />;
        })}
    </StyledProductsGrid>
  );
}
