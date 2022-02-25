import { CartItemType } from "../types/tyeps";
import { Wrapper } from "../Item/Item.styles";
import { type } from "os";
import CartItem from '../CartItem/CartItem';

type Props = {
    cartItems:CartItemType[];
    addToCart:(clickedITem:CartItemType)=>void;
    removeFromCart:(id:number)=>void;
};

const Cart : React.FC<Props> =({cartItems,addToCart,removeFromCart})=>{
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
        </Wrapper>
    )
};

export default Cart;