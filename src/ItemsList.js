import React from 'react'
import { useGlobalContext } from './context'
import ListItem from './ListItem'

function ItemsList() {
  const { list, sorted, fetchData } = useGlobalContext()
  if (!list.length) {
    return (
      <div className='no-match'>
        <h1>no matching item</h1>
        <button className='btn btn-empty ' onClick={fetchData}>
          Back to the Shop
        </button>
      </div>
    )
  }
  return (
    <main className='list-container'>
      <section className='list'>
        {list.map((item) => {
          return <ListItem key={item.id} {...item} />
        })}
      </section>
      {sorted && (
        <button className='btn clear-btn ' onClick={fetchData}>
          Back to the Shop
        </button>
      )}
    </main>
  )
}

export default ItemsList
