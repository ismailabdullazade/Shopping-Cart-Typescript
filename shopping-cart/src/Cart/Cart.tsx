import { CartItemType } from "../types/types";
import { Wrapper } from "./Cart.styles";
import { type } from "os";
import CartItem from '../CartItem/CartItem';

type Props = {
    cartItems:CartItemType[];
    addToCart:(clickedITem:CartItemType)=>void;
    removeFromCart:(id:number)=>void;
};

const Cart : React.FC<Props> =({cartItems,addToCart,removeFromCart})=>{

    const calculateTotal =(items:CartItemType[]) =>
        items.reduce((ack:number,item) =>ack + item.amount*item.price,0)
    
    return(
        <Wrapper>
            <h2>Your shopping Cart</h2>
            {cartItems.length === 0 ? <p>No items in cart</p> : null}
            {cartItems.map(item=>(
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2>Total amount ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
};

export default Cart;