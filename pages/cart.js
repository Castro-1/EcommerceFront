import Header from "@/components/Header";
import { styled } from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import WhiteBox from "@/components/WhiteBox";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ErrorIcon from "@/components/icons/ErrorIcon";
import css from "styled-jsx/css";
import ErrorAlert from "@/components/ErrorAlert";
import Footer from "@/components/Footer";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin: 40px 0;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2) {
    text-align: right;
  }
  table tr.subtotal td {
    padding: 15px 0;
  }
  table tbody tr.subtotal td:nth-child(2) {
    font-size: 1.4rem;
  }
  tr.total td {
    font-weight: bold;
  }
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const QuantityButtonCell = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-flow: column-reverse;
  }
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 70px;
  padding: 2px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
    width: 100px;
    height: 100px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const AlertContainer = styled.div`
  position: absolute;
  top: -15%;
  right: 20%;
`;

const OrderFormContainer = styled.div`
  position: relative;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [shippingFee, setShippingFee] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const link = window.location.href;
      if (link.includes("success")) {
        console.log("entró");
        clearCart();
        setIsSuccess("success");
      } else if (link.includes("cancel")) {
        setIsSuccess(link.toString());
      }
    }
    axios.get("api/settings?name=shippingFee").then((res) => {
      setShippingFee(res.data.value);
    });
  }, []);

  useEffect(() => {
    if (isSuccess === "success" || isSuccess === false) return;
    console.log(isSuccess);
    const orderId = isSuccess.substring(
      isSuccess.indexOf("=") + 1,
      isSuccess.length
    );
    axios.delete("/api/orders?id=" + orderId).then((res) => {
      router.push("/cart");
    });
  }, [isSuccess]);

  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get("/api/address").then((res) => {
      setName(res.data?.name);
      setCity(res.data?.city);
      setEmail(res.data?.email);
      setStreetAddress(res.data?.streetAddress);
      setCountry(res.data?.country);
      setPostalCode(res.data?.postalCode);
    });
  }, [session]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    if (
      name === "" ||
      email === "" ||
      city === "" ||
      postalCode === "" ||
      country === "" ||
      streetAddress === ""
    ) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5100);
      return;
    }
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      country,
      streetAddress,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let productsTotal = 0;

  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price;
    productsTotal += price;
  }

  if (isSuccess === "success") {
    return (
      <>
        <Header />
        <ColumnsWrapper>
          <Center>
            <WhiteBox>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </WhiteBox>
          </Center>
        </ColumnsWrapper>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <RevealWrapper delay={0}>
            <WhiteBox>
              <h2>Cart</h2>
              {!products?.length ? (
                <div>Your cart is empty</div>
              ) : (
                <>
                  <Table>
                    <thead>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id}>
                          <ProductInfoCell>
                            <ProductImageBox>
                              <img src={product.images[0]} alt={product.name} />
                            </ProductImageBox>
                            {product.name}
                          </ProductInfoCell>
                          <td>
                            <QuantityButtonCell>
                              <Button
                                onClick={() => lessOfThisProduct(product._id)}
                              >
                                -
                              </Button>
                              <QuantityLabel>
                                {
                                  cartProducts.filter(
                                    (id) => id === product._id
                                  ).length
                                }
                              </QuantityLabel>
                              <Button
                                onClick={() => moreOfThisProduct(product._id)}
                              >
                                +
                              </Button>
                            </QuantityButtonCell>
                          </td>
                          <td>
                            $
                            {cartProducts.filter((id) => id === product._id)
                              .length * product.price}
                          </td>
                        </tr>
                      ))}
                      <tr className="subtotal">
                        <td colSpan={2}>Products</td>
                        <td>${productsTotal}</td>
                      </tr>
                      <tr className="subtotal">
                        <td colSpan={2}>Shipping</td>
                        <td>${shippingFee}</td>
                      </tr>
                      <tr className="subtotal total">
                        <td colSpan={2}>Total</td>
                        <td>${productsTotal + parseInt(shippingFee || 0)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              )}
            </WhiteBox>
          </RevealWrapper>
          {!!products?.length && (
            <RevealWrapper delay={100}>
              <WhiteBox small="true">
                <OrderFormContainer>
                  <h2>Order Information</h2>
                  {showAlert && (
                    <AlertContainer>
                      <ErrorAlert
                        showAlert={showAlert}
                        content="Fill out all fields"
                      />
                    </AlertContainer>
                  )}
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    name="name"
                    required
                    onChange={(ev) => setName(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    required
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                  <CityHolder>
                    <Input
                      type="text"
                      placeholder="City"
                      value={city}
                      name="city"
                      required
                      onChange={(ev) => setCity(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      name="postalCode"
                      required
                      onChange={(ev) => setPostalCode(ev.target.value)}
                    />
                  </CityHolder>
                  <Input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    name="streetAddress"
                    required
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Country"
                    value={country}
                    name="country"
                    required
                    onChange={(ev) => setCountry(ev.target.value)}
                  />
                  <Button black="true" block="true" onClick={goToPayment}>
                    Continue to payment
                  </Button>
                </OrderFormContainer>
              </WhiteBox>
            </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
      <Footer />
    </>
  );
}
