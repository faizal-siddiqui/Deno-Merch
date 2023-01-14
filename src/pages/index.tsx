import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useAppDispatch, useAppSelector } from "redux/store";
import { getProductsAPI } from "redux/product/product.api";
import { getProducts } from "../../redux/product/product.action";
import { Box } from "@chakra-ui/react";
import ProductCart from "components/ProductCart";
import NextSEO from "components/NextSEO";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, error, loading } = useAppSelector((store) => store.product);

  const dispatch: any = useAppDispatch();

  const getProduct = async () => {
    const data = await getProductsAPI();
    dispatch(getProducts());
  };

  useEffect(() => {
    getProduct();
  }, [dispatch]);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      <NextSEO
        title="homepage"
        description="Home page for my webpage"
        ogImage="/og-image.png"
        url={new URL("http://localhost:3000/")}
      />
      <main>
        <Box
          width="calc(11/12)%"
          maxWidth="5xl"
          mx="auto"
          mt="28"
          aria-labelledby="information-heading"
        >
          <Box
            display="grid"
            gridTemplateColumns={{
              base: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            }}
            gap={{ base: 8 }}
            rowGap={{ sm: "10", lg: "12" }}
            columnGap={{ lg: "10" }}
          >
            {data.map((product: any) => (
              <ProductCart key={product.id} product={product} />
            ))}
          </Box>
        </Box>
      </main>
    </>
  );
}
