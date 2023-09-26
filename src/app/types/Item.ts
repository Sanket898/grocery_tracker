export interface Item {
  name: string,
  brand: string,
  category: string,
  type: string,
  quantity: number,
  price: number,
  note: string,
  checked: boolean,
}

export interface ItemsList {
  title: string,
  date: Date,
  items: Item[],
  total: number
}
