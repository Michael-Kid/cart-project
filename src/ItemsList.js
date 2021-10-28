import React from 'react'
import { useGlobalContext } from './context'
import ListItem from './ListItem'

function ItemsList() {
  const { list, sorted, backData } = useGlobalContext()
  if (!list.length) {
    return (
      <div className='no-match'>
        <h1>no matching item</h1>
        <button className='btn btn-empty ' onClick={backData}>
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
        {sorted && (
          <button className='btn clear-btn ' onClick={backData}>
            Back to the Shop
          </button>
        )}
      </section>
    </main>
  )
}

export default ItemsList
