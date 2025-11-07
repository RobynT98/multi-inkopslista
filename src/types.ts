export type ListType = "shopping" | "wishlist" | "projekt" | "katter"

export interface Item {
  id: string
  title: string
  qty?: number | null
  price?: number | null
  link?: string | null
  img?: string | null
  category?: string | null
  done: boolean
  added: number
}

export interface List {
  id: string
  name: string
  type: ListType
  created: number
  items: Item[]
}