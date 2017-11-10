import * as React from 'react'

export interface TodoListProps {
  items: string[]
  onAdd: (value: string) => void
  onEdit: (index: number, value: string) => void
  onDelete: (index: number) => void
}

export function TodoListView({ items, onAdd, onEdit, onDelete }: TodoListProps) {
  const handleSubmitNew: React.FormEventHandler<HTMLElement> = (event) => {
    event.preventDefault()

    const input = event.currentTarget.querySelector('input')
    if (input) {
      onAdd(input.value)
    }
  }

  return (
  <div>
      <ul>
        {
          items.map((item, i) => (
            <li key={i}>
              <input value={item} onChange={(event) => onEdit(i, event.currentTarget.value)} />
              <button onClick={() => onDelete(i)}>Delete</button>
            </li>
          ))
        }
      </ul>
      <form onSubmit={handleSubmitNew}>
        <input />
      </form>
    </div>
  )
}
