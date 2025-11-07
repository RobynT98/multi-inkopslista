import { create } from "zustand"
import { persist } from "zustand/middleware"
import { List, Item, ListType } from "../types"
import { uid } from "../utils/storage"

interface State {
  lists: List[]
  activeId: string | null
  createList: (name: string, type: ListType) => string
  deleteList: (id: string) => void
  setActive: (id: string) => void
  addItem: (listId: string, item: Omit<Item, "id"|"added"|"done">) => void
  toggleItem: (listId: string, itemId: string) => void
  removeItem: (listId: string, itemId: string) => void
}

export const useLists = create<State>()(
  persist(
    (set, get) => ({
      lists: [
        { id: uid(), name: "Min första lista", type: "shopping", created: Date.now(), items: [] }
      ],
      activeId: null,
      createList(name, type) {
        const l: List = { id: uid(), name, type, created: Date.now(), items: [] }
        set(s => ({ lists: [l, ...s.lists], activeId: l.id }))
        return l.id
      },
      deleteList(id) {
        set(s => {
          const lists = s.lists.filter(l => l.id !== id)
          const activeId = lists[0]?.id ?? null
          return { lists, activeId }
        })
      },
      setActive(id) { set({ activeId: id }) },
      addItem(listId, input) {
        set(s => ({
          lists: s.lists.map(l => l.id !== listId ? l : {
            ...l,
            items: [
              { id: uid(), added: Date.now(), done: false, ...input },
              ...l.items
            ]
          })
        }))
      },
      toggleItem(listId, itemId) {
        set(s => ({
          lists: s.lists.map(l => l.id !== listId ? l : {
            ...l,
            items: l.items.map(i => i.id === itemId ? { ...i, done: !i.done } : i)
          })
        }))
      },
      removeItem(listId, itemId) {
        set(s => ({
          lists: s.lists.map(l => l.id !== listId ? l : {
            ...l,
            items: l.items.filter(i => i.id !== itemId)
          })
        }))
      }
    }),
    { name: "multiLists.v2" }
  )
)