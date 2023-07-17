import { styled } from "styled-components";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const StyledFooter = styled.footer`
  background-color: #222;
  min-height: 300px;
  margin-top: 100px;
  color: #fff;
`;

const FooterContainer = styled.footer`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
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

export default function Footer() {
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterGrid>
          <div>
            <FooterTitle>Element</FooterTitle>
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
            <FooterTitle>Element</FooterTitle>
          </div>
        </FooterGrid>
        <p>Ecommerce &copy; 2023</p>
      </FooterContainer>
    </StyledFooter>
  );
}
