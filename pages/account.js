import Header from "@/components/Header";
import Title from "@/components/Title";
import Center from "@/components/Center";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/Button";
import { styled } from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import { RevealWrapper } from "next-reveal";
import Input from "@/components/Input";
import { useState } from "react";
import axios from "axios";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px 0;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function AccountPage() {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCounty] = useState("");

  async function logout() {
    await signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL });
  }

  async function login() {
    await signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country };
    axios.put("/api/address", data);
  }
  return (
    <>
      <Header />
      <Center>
        <Title>Account</Title>
        <ColsWrapper>
          <div>
            <RevealWrapper>
              <WhiteBox>
                <h2>Wishlist</h2>
              </WhiteBox>
            </RevealWrapper>
          </div>
          <diV>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>Account details</h2>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Country"
                  value={country}
                  name="country"
                  onChange={(ev) => setCounty(ev.target.value)}
                />
                <Button black="true" block="true" onClick={saveAddress}>
                  Save
                </Button>
                <hr />
                {session ? (
                  <Button primary="true" onClick={logout}>
                    Logout
                  </Button>
                ) : (
                  <Button primary="true" onClick={login}>
                    Login
                  </Button>
                )}
              </WhiteBox>
            </RevealWrapper>
          </diV>
        </ColsWrapper>
      </Center>
    </>
  );
}