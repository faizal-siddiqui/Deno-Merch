import React from "react";
import Link from "next/link";
import { Box, Text } from "@chakra-ui/react";
import { MdKeyboardBackspace } from "react-icons/md";

import NextSEO from "../../../components/NextSEO";
import ProductDetails from "../../../components/ProductDetails";
import data from "../../../db.json";
import axios, { AxiosResponse } from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { Product } from "@/utils/types";
import { getProductsAPI } from "redux/product/product.api";

type SingleProduct = {
  product: Product;
};

const Prodcut = ({ product }: SingleProduct) => {
  //   const product: any = data.products[0];
  return (
    <>
      <NextSEO
        title="homepage"
        description="Home page for my webpage"
        ogImage="/og-image.png"
        url={new URL("http://localhost:3000/")}
      />
      <Box
        w="calc(11/12)%"
        mt="16"
        maxW="5xl"
        mx="auto"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
      >
        <Link href="/">
          <Text
            display="flex"
            alignItems="center"
            gap={2}
            textColor="gray.400"
            transition="text-color"
            transitionDuration="200s"
            _hover={{
              textColor: "gray.800",
            }}
          >
            <MdKeyboardBackspace />
            Back to shop
          </Text>
        </Link>
      </Box>
      <ProductDetails product={product} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getProductsAPI();

  return {
    paths: data.map((product: Product) => ({
      params: { id: `${product.id}` },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await axios.get(
    `http://localhost:8080/products/${context?.params?.id}`
  );

  return {
    props: {
      product: response.data,
    },
  };
};

export default Prodcut;
