import * as React from 'react'
import { TodoListView } from './TodoListView'

export interface TodoListProps {

}

export interface TodoListState {
  items: string[]
}

export class TodoList extends React.PureComponent<TodoListProps, TodoListState> {
  state = { items: [] }

  handleAdd = (item: string) => {
    this.setState({
      items: [...this.state.items, item ]
    })
  }

  handleDelete = (index: number) => {
    const next = this.state.items.slice()
    next.splice(index, 1)

    this.setState({
      items: next
    })
  }

  handleEdit = (index: number, value: string) => {
    const next = this.state.items.slice()
    next[index] = value

    this.setState({
      items: this.state.items
    })
  }

  render() {
    return (
      <TodoListView
        items={this.state.items}
        onAdd={this.handleAdd}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
      />
    )
  }
}
