import { styled } from "styled-components";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import PhoneIcon from "./icons/PhoneIcons";
import EmailIcon from "./icons/EmailIcon";
import Input from "./Input";
import Button from "./Button";

const StyledFooter = styled.footer`
  background-color: #222;
  min-height: 300px;
  margin-top: 100px;
  color: #fff;
  text-align: center;
`;

const FooterContainer = styled.footer`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 10px;
  p {
    color: #ccc;
    margin-top: 20px;
    font-size: 12px;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  text-align: left;
`;

const FooterTitle = styled.h3`
  border-bottom: 2px solid #aaa;
  max-width: 100px;
`;

const StyledNav = styled.nav``;

const NavLink = styled(Link)`
  display: flex;
  justify-conten: center;
  color: #aaa;
  text-decoration: none;
  min-width: 30px;
  padding: 5px 0;
  transition: 0.3s ease-in-out;
  &:hover {
    color: #eee;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #ccc;
  margin-bottom: 10px;
`;

const NewsletterContainer = styled.div`
  max-width: 220px;
  button {
    padding: 5px;
    font-size: 14px;
    margin-top: 5px;
  }
`;

export default function Footer() {
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterGrid>
          <div>
            <FooterTitle>Newsletter</FooterTitle>
            <NewsletterContainer>
              <Input placeholder="Email" />
              <Button>Submit</Button>
              <p>
                Subscribe to our awesome newsletter to recieve discounts and get
                previous access to our new products!
              </p>
            </NewsletterContainer>
          </div>
          <div>
            <FooterTitle>Menu</FooterTitle>
            <StyledNav>
              <NavLink href={"/"}>Home</NavLink>
              <NavLink href={"/products"}>All products</NavLink>
              <NavLink href={"/categories"}>Categories</NavLink>
              <NavLink href={"/account"}>Account</NavLink>
              <NavLink href={"/cart"}> Cart ({cartProducts.length})</NavLink>
            </StyledNav>
          </div>
          <div>
            <FooterTitle>Contact</FooterTitle>
            <ContactInfo>
              <PhoneIcon /> +57 312 7874477
            </ContactInfo>
            <ContactInfo>
              <EmailIcon /> ecommerce@example.com
            </ContactInfo>
          </div>
        </FooterGrid>
        <p>Ecommerce &copy; 2023</p>
      </FooterContainer>
    </StyledFooter>
  );
}