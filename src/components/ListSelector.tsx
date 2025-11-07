import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useLists } from "../store/lists"

export default function ListSelector() {
  const { id } = useParams()
  const nav = useNavigate()
  const { lists, activeId, setActive, createList, deleteList } = useLists()

  useEffect(() => { if (id) setActive(id) }, [id, setActive])

  return (
    <div className="flex items-center gap-2">
      <select
        className="rounded-full border border-line bg-bg px-3 py-2"
        value={activeId ?? ""}
        onChange={(e) => nav(`/lists/${e.target.value}`)}
      >
        {lists.map(l => (
          <option key={l.id} value={l.id}>{l.name} ({l.type})</option>
        ))}
      </select>

      <button
        className="rounded-full border border-line bg-bg px-3 py-2"
        onClick={() => {
          const name = prompt("Namn på ny lista?")
          if (!name) return
          const type = (prompt("Typ (shopping|wishlist|projekt|katter)", "shopping") ?? "shopping") as any
          const newId = createList(name, type)
          nav(`/lists/${newId}`)
        }}
      >Ny lista</button>

      <button
        className="rounded-full border border-line bg-bg/50 px-3 py-2 text-red-300"
        onClick={() => {
          if (!activeId) return
          if (confirm("Ta bort listan?")) {
            deleteList(activeId)
            if (useLists.getState().lists[0]) nav(`/lists/${useLists.getState().lists[0].id}`)
            else window.location.href = "/"
          }
        }}
      >Ta bort</button>
    </div>
  )
}