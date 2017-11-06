import * as React from 'react'
import { controller, service } from '@brightinteractive/bright-js-framework'
import { TodoListView } from './TodoListView'
import { ListService } from './ListService'

@controller()
export class TodoList extends React.PureComponent {
  @service(ListService)
  list: ListService

  render() {
    return (
      <TodoListView
        items={this.list.items}
        onAdd={this.list.handleAdd}
        onEdit={this.list.handleEdit}
        onDelete={this.list.handleDelete}
      />
    )
  }
}
