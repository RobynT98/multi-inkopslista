import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ListSelector from "../components/ListSelector"
import ItemForm from "../components/ItemForm"
import Toolbar from "../components/Toolbar"
import { useLists } from "../store/lists"

export default function Home() {
  const nav = useNavigate()
  const { activeId, lists } = useLists()
  useEffect(() => { if (!activeId && lists[0]) nav(`/lists/${lists[0].id}`, { replace:true }) }, [activeId, lists, nav])
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-line bg-card p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <ListSelector />
          <Toolbar />
        </div>
        <ItemForm />
      </div>
    </div>
  )
}