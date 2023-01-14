import React from "react";
import {
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Box,
  DrawerFooter,
  Text,
  Flex,
} from "@chakra-ui/react";
import { BsBag } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "redux/store";
import Image from "next/image";
import { deleteFromCart, getCart, updateCart } from "redux/cart/cart.action";

const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  // const [array, setArray] = React.useState<number[]>([]);

  const dispatch: any = useAppDispatch();
  const { loading, error, data } = useAppSelector((store) => store.cart);

  const { data: products } = useAppSelector((store) => store.product);

  React.useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // React.useEffect(() => {
  //   setArray(data.map((cart: Cart) => cart.productId));
  // }, [dispatch]);

  // console.log(array);

  const deleteCart = (id: number) => {
    dispatch(deleteFromCart(id));
  };

  const decreaseCount = (id: number, count: number) => {
    dispatch(updateCart(id, count - 1));
  };
  const increaseCount = (id: number, count: number) => {
    dispatch(updateCart(id, count + 1));
  };

  return (
    <Box>
      <Button
        variant="outline"
        colorScheme="gray"
        display="flex"
        gap={2}
        alignItems="center"
        borderWidth={2}
        borderColor="gray.800"
        borderRadius="full"
        ref={btnRef}
        onClick={onOpen}
      >
        <BsBag />
        {data.length || 0}
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        placement="right"
        size="md"
      >
        <DrawerOverlay>
          <DrawerContent borderLeftRadius="24">
            <DrawerCloseButton mt={4} />
            <DrawerHeader mt={4}>Shopping Cart</DrawerHeader>
            <DrawerBody>
              {data?.map((cart) =>
                products?.map((prod) => {
                  if (cart.productId === prod.id) {
                    return (
                      <Box key={prod.id * cart.id}>
                        <Flex align="center" justify="space-between" mt="10px">
                          <Box>
                            <Image
                              src={prod.featuredImage.url}
                              alt={prod.featuredImage.altText}
                              width="100"
                              height="100"
                            />
                          </Box>
                          <Text>{prod.title}</Text>
                          <Box>
                            <Flex>
                              <Box>
                                <Button
                                  disabled={cart.count === 1}
                                  onClick={() =>
                                    decreaseCount(cart.id, cart.count)
                                  }
                                >
                                  -
                                </Button>
                              </Box>
                              <Box>
                                <Button disabled>{cart.count || 0}</Button>
                              </Box>
                              <Box>
                                <Button
                                  onClick={() =>
                                    increaseCount(cart.id, cart.count)
                                  }
                                >
                                  +
                                </Button>
                              </Box>
                            </Flex>
                          </Box>
                          <Box>
                            <Button onClick={() => deleteCart(cart.id)}>
                              Delete
                            </Button>
                          </Box>
                        </Flex>
                      </Box>
                    );
                  }
                  return;
                })
              )}
            </DrawerBody>
            <DrawerFooter>
              <Button
                size="lg"
                w="full"
                colorScheme="blackAlpha"
                onClick={onClose}
                mb={12}
              >
                Checkout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Cart;
