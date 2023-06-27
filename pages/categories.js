import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductWhiteBox from "@/components/ProductBox";
import Title from "@/components/Title";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { styled } from "styled-components";
import Link from "next/link";
import { RevealWrapper } from "next-reveal";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { mongooseConnect } from "@/lib/mongoose";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CategoryTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 15px;
  a {
    color: #555;
  }
  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 160px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  text-decoration: none;
`;

export default function CategoriesPage({
  mainCategories,
  categoriesProducts,
  wishedProducts = [],
}) {
  return (
    <>
      <Header />
      <Center>
        {mainCategories.map((category) => (
          <CategoryWrapper key={category._id}>
            <CategoryTitle>
              <h2>{category.name}</h2>
              <div>
                <Link href={"/category/" + category._id}>Show all</Link>
              </div>
            </CategoryTitle>
            <CategoryGrid>
              {categoriesProducts[category._id].map((p, index) => (
                <RevealWrapper key={p._id} delay={index * 50}>
                  <ProductWhiteBox
                    {...p}
                    wished={wishedProducts.includes(p._id)}
                  />
                </RevealWrapper>
              ))}
              <RevealWrapper
                delay={categoriesProducts[category._id].length * 50}
              >
                <ShowAllSquare href={"/category/" + category._id}>
                  Show all &rarr;
                </ShowAllSquare>
              </RevealWrapper>
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProducts = {}; // catId => [products]
  const allFetchedProductsId = [];
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c.parent?.toString() === mainCatId)
      .map((c) => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 },
    });
    allFetchedProductsId.push(...products.map((p) => p._id.toString()));
    categoriesProducts[mainCat._id] = products;
  }

  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: allFetchedProductsId,
      })
    : [];
  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      wishedProducts: wishedProducts.map((i) => i.product.toString()),
    },
  };
}
