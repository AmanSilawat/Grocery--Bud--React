import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ list, remove_item, edit_item }) => {
  return (
    <div className="grocery-list">
      {list.map(item => {
        const { id, title } = item;
        return (
          <article key={id} className='grocery-item'>
            <p className="btn-container">{title}</p>
            <div className="btn-container">
              <button className="edit-btn" onClick={() => edit_item(id)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => remove_item(id)}>
                <FaTrash />
              </button>
            </div>
          </article>)
      })}
    </div>
  )
}

export default List
