// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import './cart-icon.styles'
import {useContext} from "react";
import {CartContext} from "../../context/cart.context";

import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => { setIsCartOpen(!isCartOpen); }

    return (
        <CartIconContainer>
            <ShoppingIcon onClick={ toggleIsCartOpen } />
            <ItemCount>{ cartCount }</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;
