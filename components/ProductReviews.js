import { styled } from "styled-components";
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import StarsRating from "./StarsRating";
import Textarea from "./Textarea";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { useSession } from "next-auth/react";
import ErrorAlert from "./ErrorAlert";

const Title = styled.h2`
  font-size: 1.2rem;
`;

const Subtitle = styled.h3`
  font-size: 1rem;
  margin: 5px 0;
`;

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
`;

const ReviewWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 1px solid #eee;
  padding-top: 10px 0;
  h3 {
    margin: 3px 0;
    font-size: 1rem;
    color: #333;
    font-weight: normal;
  }
  p {
    margin: 0;
    font-size: 0.7rem;
    line-height: 1rem;
    color: #555;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time {
    font-size: 12px;
    color: #aaa;
  }
`;

const AlertContainer = styled.div`
  position: absolute;
  top: -18%;
  right: -11%;
  @media screen and (min-width: 768px) {
    top: -10%;
    right: 0%;
  }
`;

const ReviewFormContainer = styled.div`
  position: relative;
`;

export default function ProductReviews({ product }) {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  function submitReview() {
    if (!session) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5100);
      return;
    }
    const data = {
      title,
      description,
      stars,
      product: product._id,
    };
    axios.post("/api/reviews", data).then((res) => {
      setTitle("");
      setDescription("");
      setStars(0);
    });
  }

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/reviews?product=" + product._id).then((res) => {
      setReviews(res.data || []);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <Title>Reviews</Title>
      <ColsWrapper>
        <div>
          <WhiteBox>
            <ReviewFormContainer>
              <Subtitle>Add review</Subtitle>
              {showAlert && (
                <AlertContainer>
                  <ErrorAlert
                    showAlert={showAlert}
                    content="Login to submit review"
                  />
                </AlertContainer>
              )}
              <StarsRating
                onChange={(n) => {
                  setStars((prev) => (prev === n ? 0 : n));
                }}
                defaultHowMany={stars}
              />
              <Input
                placeholder="Title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
              <Textarea
                placeholder="Was it good? Pros? Cons?"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
              <div>
                <Button primary="true" onClick={submitReview}>
                  Submit your review
                </Button>
              </div>
            </ReviewFormContainer>
          </WhiteBox>
        </div>
        <div>
          <WhiteBox>
            <Subtitle>All reviews</Subtitle>
            {isLoading && <Spinner fullWidth={true} />}
            {reviews.length === 0 && <p>No reviews :(</p>}
            {reviews.length > 0 &&
              reviews.map((review) => (
                <ReviewWrapper key={review._id}>
                  <ReviewHeader>
                    <StarsRating size={"sm"} defaultHowMany={review.stars} />
                    <time>{new Date(review.createdAt).toLocaleString()}</time>
                  </ReviewHeader>
                  <h3>{review.title}</h3>
                  <p>{review.description}</p>
                </ReviewWrapper>
              ))}
          </WhiteBox>
        </div>
      </ColsWrapper>
    </div>
  );
}
