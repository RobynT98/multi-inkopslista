import { useParams } from "react-router-dom"
import { useLists } from "../store/lists"
import ItemCard from "../components/ItemCard"

export default function ListView() {
  const { id } = useParams<{id: string}>()
  const { lists } = useLists()
  const list = lists.find(l => l.id === id)

  if (!list) return <p className="text-muted">Listan finns inte.</p>

  const doneCount = list.items.filter(i => i.done).length
  const total = list.items.length
  const sum = list.items.filter(i=>!i.done && i.price).reduce((a,b)=> a + (b.price ?? 0), 0)

  return (
    <section className="mt-4 rounded-2xl border border-line bg-card p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs px-2 py-1 rounded-full border border-line text-muted">Skapad {new Date(list.created).toLocaleDateString()}</span>
        <span className="text-sm text-muted">{doneCount}/{total} klara</span>
        <span className="text-sm">Summa (oköpta): <strong>{sum.toFixed(2)} kr</strong></span>
      </div>

      <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
        {list.items.sort((a,b) => (a.done===b.done? 0 : a.done? 1 : -1)).map(i => (
          <ItemCard key={i.id} listId={list.id} item={i} />
        ))}
      </div>
    </section>
  )
}