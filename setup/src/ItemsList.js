import React from 'react'
import { useGlobalContext } from './context'
import ListItem from './ListItem'
// import data from './data'

function ItemsList() {
  const { list, sorted, backData } = useGlobalContext()
  if (!list.length) {
    return (
      <div>
        <h1>no matching item</h1>
        <button className='btn clear-btn ' onClick={backData}>
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
        {/* {data.map((item) => {
          return <ListItem key={item.id} {...item} />
        })} */}
      </section>
      {sorted && (
        <button className='btn clear-btn ' onClick={backData}>
          Back to the Shop
        </button>
      )}
    </main>
  )
}

export default ItemsList
