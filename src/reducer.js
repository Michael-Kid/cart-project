const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [], chosenId: [] }
  }

  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      chosenId: state.chosenId.filter((item) => !item.includes(action.payload)),
    }
  }

  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem
        const itemTotal = price * amount
        cartTotal.total += itemTotal
        cartTotal.amount += amount
        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      }
    )
    total = parseFloat(total.toFixed(2))

    return { ...state, total, amount }
  }

  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }

  if (action.type === 'DISPLAY_ITEMS') {
    return {
      ...state,
      list: action.payload.list,
      loading: false,
      sorted: false,
      search: action.payload.search,
    }
  }

  if (action.type === 'SORTED_ITEMS') {
    return {
      ...state,
      list: action.payload.list,
      sorted: true,
      search: action.payload.name,
    }
  }

  if (action.type === 'ADD_TO_CART') {
    let tempList = state.list.find((listItem) => listItem.id === action.payload)
    let newCart = [...state.cart, tempList]
    return {
      ...state,
      cart: newCart,
      chosenId: [...state.chosenId, action.payload],
    }
  }

  if (action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === 'inc') {
            return { ...cartItem, amount: cartItem.amount + 1 }
          }
          if (action.payload.type === 'dec') {
            return { ...cartItem, amount: cartItem.amount - 1 }
          }
        }
        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0)
    let tempCartId = tempCart.map((item) => item.id)
    return {
      ...state,
      cart: tempCart,
      chosenId: tempCartId,
    }
  }

  if (action.type === 'CART_TOTAL') {
    return { ...state, amount: state.cart.length }
  }

  throw new Error('no matching ')
}

export default reducer
