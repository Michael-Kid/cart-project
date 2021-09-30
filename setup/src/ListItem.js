import React from 'react'
import { useGlobalContext } from './context'

function ListItem({ id, img, title, price }) {
  const { addToCart } = useGlobalContext()
  return (
    <article className='list-item'>
      <div>
        <img src={img} alt={title} />
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <button className='remove-btn' onClick={() => addToCart(id)}>
          buy
        </button>
      </div>
    </article>
  )
}

export default ListItem
