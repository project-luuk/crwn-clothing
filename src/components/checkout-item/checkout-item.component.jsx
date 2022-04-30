import './checkout-item.styles.scss'
import {useContext} from "react";
import {CartContext} from "../../context/cart.context";

const CheckoutItem = ({ cartItem }) => {
    const { id, name, imageUrl, price, quantity } = cartItem;
    const { removeItemFromCart, addItemToCart } = useContext(CartContext);

    const removeItemFromCartHandler = () => removeItemFromCart(cartItem, false);
    const deleteItemFromCartHandler = () => removeItemFromCart(cartItem, true);
    const addItemToCartHandler = () => addItemToCart(cartItem);

    return (
     <div className='checkout-item-container' key={ id }>
         <div className='image-container'>
             <img src={ imageUrl } alt={ `${name}` } />
         </div>
         <span className='name'>{ name }</span>
         <span className='quantity'>
             <div className='arrow' onClick={ removeItemFromCartHandler }>&#10094;</div>
                <span className='value'>{ quantity }</span>
             <div className='arrow' onClick={ addItemToCartHandler }>&#10095;</div>
         </span>
         <span className='price'>${ price }</span>

         <div className='remove-button' onClick={ deleteItemFromCartHandler } >&#10005;</div>
    </div>
    );
};

export default CheckoutItem;