import { useLists } from "../store/lists"

export default function Toolbar() {
  const data = useLists(s => ({ lists: s.lists }))

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ lists: data.lists }, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "multi-lnkopslista.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const importJSON = async () => {
    const it = document.createElement("input")
    it.type = "file"; it.accept = "application/json"
    it.onchange = async () => {
      const file = it.files?.[0]; if (!file) return
      try {
        const text = await file.text()
        const parsed = JSON.parse(text)
        if (!parsed.lists) throw new Error("Ogiltigt format")
        localStorage.setItem("multiLists.v2", JSON.stringify(parsed))
        location.reload()
      } catch (e:any) { alert("Kunde inte importera: "+e.message) }
    }
    it.click()
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted">Allt sparas lokalt</span>
      <button className="rounded-full border border-line bg-bg px-3 py-2" onClick={exportJSON}>Exportera</button>
      <button className="rounded-full border border-line bg-bg px-3 py-2" onClick={importJSON}>Importera</button>
    </div>
  )
}