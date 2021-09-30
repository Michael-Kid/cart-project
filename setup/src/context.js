import React, { useContext, useReducer, useEffect } from 'react'
// import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  list: [],
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
  sorted: false,
  search: '',
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const sortItems = (name) => {
    let newList = state.list.filter((item) =>
      item.title.toLowerCase().includes(name)
    )
    dispatch({ type: 'SORTED_ITEMS', payload: { list: newList, name: name } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }

  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id })
  }

  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id })
  }

  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const list = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: { list: list, search: '' } })
  }

  const backData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const list = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: { list: list, search: '' } })
  }

  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } })
  }

  const addToCart = (id) => {
    dispatch({ type: 'ADD_TO_CART', payload: id })
  }

  useEffect(() => {
    fetchData()
  }, [])

  // useEffect(() => {
  //   sortItems()
  // }, [state.search])

  useEffect(() => {
    dispatch({ type: 'CART_TOTAL' })
  }, [state.cart])

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' })
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        decrease,
        increase,
        toggleAmount,
        addToCart,
        sortItems,
        backData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
