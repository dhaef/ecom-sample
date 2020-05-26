import rootReducer from 'reducers/index';
import initialState from 'store/initialState';

describe('rootReducer', () => {
  describe('addItemToCart', () => {
    test('should add product to cart and set its customer size and update inventory', () => {
      const product = { ...initialState.products[0] };
      const quantity = 1;
      const size = 'm';

      const action = {
        type: 'addItemToCart',
        payload: { size, quantity, product }
      };

      const nextState = rootReducer({ ...initialState }, action);

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
});
