import { styled } from "styled-components";
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import StarsRating from "./StarsRating";

const Title = styled.h2`
  font-size: 1.2rem;
`;

const Subtitle = styled.h3`
  font-size: 1rem;
  margin: 5px 0;
`;

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
`;

export default function ProductReviews({ product }) {
  return (
    <div>
      <Title>Reviews</Title>
      <ColsWrapper>
        <WhiteBox>
          <Subtitle>Add review</Subtitle>
          <StarsRating />
          <Input placeholder="Title" />
        </WhiteBox>
        <div>
          <Subtitle>All reviews</Subtitle>
        </div>
      </ColsWrapper>
    </div>
  );
}
