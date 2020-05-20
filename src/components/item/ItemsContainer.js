import React, { useContext } from 'react'
import Items from '../item/Items';
import FilterOptions from '../filter/FilterOptions';
import Cart from '../cart/Cart';
import Filters from '../filter/Filters';
import { DispatchContext, StateContext } from '../../App';

const ItemsContainer = (props) => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const { size, cart, products } = state;

    const checkSizeOfItem = (itemBeingAdded, numberOfItems, sizeOfItem, isInCart) => {
        if (itemBeingAdded.size[sizeOfItem] === 0) {
            alert(`This item is out of stock`);
            return;
        } else if (itemBeingAdded.size[sizeOfItem] < numberOfItems) {
            alert(`Only added ${itemBeingAdded.size[sizeOfItem]} items. Don't have ${numberOfItems} in stock`);
            numberOfItems = itemBeingAdded.size[sizeOfItem];
        }

        const updatedProducts = products.map(product => {
            if (product.product_id === itemBeingAdded.product_id) {
                product.size[sizeOfItem] -= numberOfItems;
            }
            return product;
        });
        dispatch({ type: 'updateProducts', payload: updatedProducts });

        isInCart ?
            itemBeingAdded.customerSize = { ...itemBeingAdded.customerSize, [sizeOfItem]: (numberOfItems += parseInt(itemBeingAdded.customerSize[sizeOfItem])) } :
            itemBeingAdded.customerSize = { ...itemBeingAdded.customerSize, [sizeOfItem]: numberOfItems }

        return itemBeingAdded;
    };

    // Add selected item to customers cart
    const addToCart = (item, numberOfItems) => {
        // Check if customer selected the size 
        if (size.size === null || size.id !== item) {
            alert('Please select a size for this item');
            return;
            // Check if customer selected the number of items
        } else if (numberOfItems.id !== null && item !== numberOfItems.id) {
            alert('Please select number of items for the product you would like to add');
            return;
        } else {
            let alreadyInCart = false;
            const currentCart = cart;
            // Get the item to add to the cart
            let itemToAdd = products.find(product => product.product_id === parseInt(item));
            // Check if that item is already in the cart
            currentCart.forEach(cart => {
                if (parseInt(item) === cart.product_id) {
                    itemToAdd.customerSize = { ...cart.customerSize };
                    alreadyInCart = true;
                }
            });
            // If not in the cart initalize new selected size and quantity object
            if (alreadyInCart === false) {
                itemToAdd.customerSize = { s: 0, m: 0, l: 0 };
            }

            // Check what size selected and see if;
            // Item is in stock or
            // Item has the desired amount in stock 
            if (size.size === 's') {
                checkSizeOfItem(itemToAdd, parseInt(numberOfItems.number), 's', alreadyInCart);
            } else if (size.size === 'm') {
                checkSizeOfItem(itemToAdd, parseInt(numberOfItems.number), 'm', alreadyInCart);
            } else if (size.size === 'l') {
                checkSizeOfItem(itemToAdd, parseInt(numberOfItems.number), 'l', alreadyInCart);
            }
            // If item is already in the cart don't add it again
            if (alreadyInCart === true) {
                dispatch({ type: 'setCurrentSize', payload: { size: null, id: null } });
                return;
            }

            currentCart.push(itemToAdd);
            dispatch({ type: 'addItemToCart', payload: currentCart });
            dispatch({ type: 'setCurrentSize', payload: { size: null, id: null } });
        }
    };

    return (
        <div className="container" style={{ marginTop: '.5rem' }}>
            <div className="row">
                <div className="col-3 container">
                    <div className="row">
                        <h1>Product Filters</h1>
                    </div>
                    <FilterOptions />
                </div>
                <div className="col-9">
                    <Cart />
                    <Filters />
                    <Items
                        addToCart={addToCart}
                    />
                </div>
            </div>
        </div>
    )
}

export default ItemsContainer
