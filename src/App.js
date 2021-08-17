import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const get_local_storage = () => {
  let list = localStorage.getItem('list');

  if (list) {
    return JSON.parse(list)
  }
  else {
    return [];
  }

}

function App() {
  const [name, set_name] = useState('')
  const [list, set_list] = useState(get_local_storage());
  const [is_editing, set_is_editing] = useState(false);
  const [edit_id, set_edit_id] = useState(null);
  const [alert, set_alert] = useState({ show: false, msg: '', type: '' })

  const handle_submit = (e) => {
    e.preventDefault();

    // when name is empty
    if (!name) {
      // set_alert
      show_alert(true, 'danger', 'please enter value');
    }

    // deal with edit
    else if (name && is_editing) {
      set_list(list.map((item) => {
        if (item.id === edit_id) {
          return {
            ...item,
            title: name
          }
        }
        return item;
      }))

      set_name('');
      set_edit_id(null);
      set_is_editing(false);
      show_alert(true, 'success', 'value changed')
    }

    // deal with add new
    else {
      show_alert(true, 'success', 'item added to the list')
      const new_item = {
        id: new Date().getTime().toString(),
        title: name
      }
      set_list([...list, new_item])
      set_name('')
    }
  }

  const show_alert = (show = false, type = '', msg = '') => {
    set_alert({ show, type, msg })
  }

  const clear_list = () => {
    show_alert(true, 'danger', 'empty list');
    set_list([])
  }

  const remove_item = (id) => {
    show_alert(true, 'danger', 'item removed');
    set_list(list.filter((item) => item.id !== id))
  }

  const edit_item = (id) => {
    const specific_item = list.find((item) => item.id === id);
    set_is_editing(true);
    set_edit_id(id);
    set_name(specific_item.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handle_submit}>
        {alert.show && <Alert {...alert} remove_alert={show_alert} list={list} />}
        <h3>grocery Bud</h3>
        <div className="form-control">
          <input className='grocery' type="text" placeholder="e.g. maggie" value={name} onChange={(e) => set_name(e.target.value)} />
          <button type="submit" className="submit-btn">
            {is_editing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="grocery-container">
          <List list={list} remove_item={remove_item} edit_item={edit_item} />
          <button className="clear-btn" onClick={clear_list}>
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
