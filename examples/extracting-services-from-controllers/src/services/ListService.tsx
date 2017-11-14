import { Service } from '@brightinteractive/bright-js-framework'

export interface ListServiceState {
  items: string[]
}

export class ListService extends Service<ListServiceState> {
  state: ListServiceState = { items: [] }

  get items() {
    return this.state.items
  }

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
}
