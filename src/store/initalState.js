export const initalState = {
  products: [
    { id: 1, customerSize: { s: 0, m: 0, l: 0 }, name: 't-shirt', fit: ['men'], size: { s: 5, m: 3, l: 3 }, colors: ['white', 'black'], price: 10, category: 'shirt', img: 'https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?cs=srgb&dl=man-wearing-white-crew-neck-shirt-and-black-jeans-991509.jpg&fm=jpg', },
    { id: 2, customerSize: { s: 0, m: 0, l: 0 }, name: 'long sleeve', fit: ['women'], size: { s: 2, m: 0, l: 3 }, colors: ['white', 'black'], price: 12, category: 'shirt', img: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
    { id: 3, customerSize: { s: 0, m: 0, l: 0 }, name: 'hoodie', fit: ['men'], size: { s: 0, m: 3, l: 3 }, colors: ['white', 'black'], price: 25, category: 'jacket', img: 'https://images.pexels.com/photos/634785/pexels-photo-634785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
    { id: 4, customerSize: { s: 0, m: 0, l: 0 }, name: 'rain coat', fit: ['women'], size: { s: 2, m: 3, l: 3 }, colors: ['red', 'yellow'], price: 28, category: 'jacket', img: 'https://images.unsplash.com/photo-1504616267454-5460d659c9be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
    { id: 5, customerSize: { s: 0, m: 0, l: 0 }, name: 'sweat pants', fit: ['men'], size: { s: 2, m: 0, l: 3 }, colors: ['grey', 'black'], price: 15, category: 'pants', img: 'https://images.pexels.com/photos/2280342/pexels-photo-2280342.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
    { id: 6, customerSize: { s: 0, m: 0, l: 0 }, name: 'blue jeans', fit: ['women'], size: { s: 2, m: 3, l: 3 }, colors: ['light', 'dark'], price: 30, category: 'pants', img: 'https://images.pexels.com/photos/52574/pexels-photo-52574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
    { id: 7, customerSize: { s: 0, m: 0, l: 0 }, name: 'workout shorts', fit: ['men'], size: { s: 2, m: 3, l: 0 }, colors: ['blue', 'black'], price: 12, category: 'shorts', img: 'https://images.unsplash.com/photo-1563479145576-b86933239cba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
    { id: 8, customerSize: { s: 0, m: 0, l: 0 }, name: 'casual shorts', fit: ['men'], size: { s: 2, m: 3, l: 3 }, colors: ['tan', 'dark grey'], price: 17, category: 'shorts', img: 'https://images.pexels.com/photos/5994/man-shorts-people-trunk.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  ],
  currentProducts: [],
  hasBeenFiltered: false,
  showCart: false,
  size: { size: null, id: null },
  cart: [],
  filter: {
    search: '',
    price: '',
    size: '',
    sex: '',
  },
  pay: {
    cardNumber: '',
    name: '',
    expire: '',
    cvv: '',
  },
  shipping: {
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    state: '',
    phoneNumber: '',
    email: '',
    alert: null,
  },
  checkout: 1,
  wishList: [],
  showWishList: false,
  alert: {
    show: false,
    msgs: []
  }
};