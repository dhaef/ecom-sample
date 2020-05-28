import rootReducer from 'reducers';
import {initalState} from 'store/initalState';

describe('rootReducer', () => {
    describe('addItemToCart', () => {
        test('should add product to cart and set its customer size and update inventory', () => {
            const product = { ...initalState.products[0] };
            const quantity = 1;
            const size = 'm';

            const action = {
                type: 'addItemToCart',
                payload: { product, quantity, size }
            };
            
            const nextState = rootReducer({ ...initalState }, action);
            
            expect(nextState.cart).toHaveLength(1);
            expect(nextState.cart[0]).toMatchObject({
                ...product,
                customerSize: {
                    ...product.customerSize,
                    [size]: quantity
                }
            });
            expect(nextState.products[0]).toMatchObject({
                ...product,
                size: {
                    ...product.size,
                    [size]: product.size[size] - quantity
                }
            })
        });
    });

    describe('removeItemFromCart', () => {
        const product = { ...initalState.products[0] };
            beforeEach(() => {
                const quantity = 2;
                const size = 'm';

                const action = {
                    type: 'addItemToCart',
                    payload: { product, quantity, size }
                };
            
                rootReducer({ ...initalState }, action);
                
            });
            
        test('should remove item from the cart and update product inventory', () => {

            const action = {
                type: 'removeItemFromCart',
                payload: product
            };

            const nextState = rootReducer({ ...initalState }, action);

            expect(nextState.cart).toHaveLength(0);
            expect(nextState.products[0]).toMatchObject({
                ...product,
                size: {
                    ...product.size,
                    m: 3
                }
            })
        }); 

    });
    
});
