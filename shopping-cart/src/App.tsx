
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Grid, LinearProgress } from '@mui/material';
import Item from './Item/Item';
import Cart from './Cart/Cart';
import { CartItemType } from './types/tyeps';
import { Wrapper } from './Item/Item.styles';
import { Drawer, Badge } from '@mui/material';
import { StyledButton } from './App.styles';
import { AddShoppingCart, CandlestickChartRounded } from '@mui/icons-material';

function App() {

    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);



    const getProducts = async (): Promise<CartItemType[]> =>
        await (await fetch('https://fakestoreapi.com/products')).json();

    const { data, error, isLoading } = useQuery<CartItemType[]>('products', getProducts);
    console.log(data);
    if (isLoading) return <LinearProgress />
    if (error) return <div>Went somtehing wrong...</div>;






    const getTotalItems = (items: CartItemType[]) => {
        return (
            items.reduce((ack: number, item) => ack + item.amount, 0)
        )
    };
    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prev => {
            const isItemInCart=prev.find(item=>item.id === clickedItem.id);
            if(isItemInCart){
                return prev.map(item => item.id === clickedItem.id 
                ? {...item,amount:item.amount + 1}
                : item )
            }
            return [...prev,{...clickedItem,amount:1}]
        })
    };
    const handleRemoveFromCart = () => null;


    return (
        <Wrapper>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)} >
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)} >
                <Badge badgeContent={getTotalItems(cartItems)} color='error' >
                    <AddShoppingCart />
                </Badge>
            </StyledButton>
            <Grid container spacing={3}>
                {
                    data?.map(item => (
                        <Grid item key={item.id} xs={12} sm={4} >
                            <Item item={item} handleAddToCart={handleAddToCart} />
                        </Grid>
                    ))
                }
            </Grid>
        </Wrapper>
    );
}

export default App;