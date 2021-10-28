import React, { useContext, useReducer, useEffect } from 'react'
import reducer from './reducer'

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
  chosenId: [],
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const sortItems = (name) => {
    let newList = [
      ...state.list.filter((item) => item.title.toLowerCase().includes(name)),
    ]
    dispatch({ type: 'SORTED_ITEMS', payload: { list: newList, name: name } })
  }

  const addToCart = (id) => {
    dispatch({ type: 'ADD_TO_CART', payload: id })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }

  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const list = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: { list, search: '' } })
  }

  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } })
  }

  useEffect(() => {
    fetchData()
  }, [])

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
        toggleAmount,
        addToCart,
        sortItems,
        fetchData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
