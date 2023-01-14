import { AspectRatio, Box, Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { addToCart } from "redux/cart/cart.action";
import { useAppDispatch } from "redux/store";
import { formatCurrency } from "../src/utils/data.utils";
import { Product } from "../src/utils/types";

type ProductDetailsProps = {
  product: Product;
};
const ProductDetails = ({ product }: ProductDetailsProps) => {
  const dispatch: any = useAppDispatch();

  const addToCartFunc = () => {
    dispatch(addToCart(product.id));
  };

  return (
    <Box
      w="calc(11/12)%"
      maxW="5xl"
      mx="auto"
      mt={8}
      display={{
        base: "block",
        lg: "grid",
      }}
      gridTemplateColumns="1fr 1fr"
      gridGap="16"
    >
      <Box display="flex" flexDir="column" justifyContent="space-between">
        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            w="full"
            gap={4}
          >
            <Box>
              <Text
                as="h2"
                fontSize={{ base: "xl", bg: "2xl" }}
                fontWeight="bold"
                textColor="gray.800"
              >
                {product.title}
              </Text>
              <Text
                as="h3"
                fontSize="md"
                lineHeight="1.25"
                textColor="gray.500"
              >
                {product.description}
              </Text>
            </Box>
            <Box
              bgColor="#E8E7E5"
              borderRadius="full"
              px="6"
              py="2"
              fontSize="lg"
              textColor="gray.900"
              fontWeight="bold"
            >
              {formatCurrency(product.priceRange.minVariantPrice)}
            </Box>
          </Box>

          <Box
            as="section"
            aria-labelledby="information-heading"
            mt="12"
            pt="6"
            borderTop="1"
            borderColor="gray.200"
          >
            <h2 id="information-heading">Product information</h2>

            {!product.priceRange.maxVariantPrice && (
              <Box display="flex" alignItems="center">
                <Text fontSize="md" textColor="gray.500">
                  Out of stock
                </Text>
              </Box>
            )}

            <Box mt="4">
              <Text fontSize="md" textColor="gray.600">
                {product.description}
              </Text>
            </Box>
          </Box>
        </Box>
        <Button onClick={addToCartFunc} w="full" colorScheme="blackAlpha">
          Add to Cart
        </Button>
      </Box>

      {/* Product image */}
      <AspectRatio
        ratio={1}
        bgColor="white"
        borderRadius="xl"
        overflow="hidden"
        borderWidth="2px"
        borderColor="gray.200"
        position="relative"
        transition="all"
        transitionDuration="500s"
      >
        <>
          {product.featuredImage && (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText}
              width="400"
              height="400"
            />
          )}
        </>
      </AspectRatio>
    </Box>
  );
};

export default ProductDetails;
