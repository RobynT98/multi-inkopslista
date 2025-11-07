import { useParams } from "react-router-dom"
import { useState } from "react"
import { useLists } from "../store/lists"

export default function ItemForm() {
  const { id } = useParams<{id: string}>()
  const addItem = useLists(s => s.addItem)
  const [title, setTitle] = useState("")
  const [qty, setQty] = useState<number | "">("")
  const [price, setPrice] = useState<number | "">("")
  const [link, setLink] = useState("")
  const [img, setImg] = useState("")
  const [cat, setCat] = useState("")

  if (!id) return null

  return (
    <div className="grid gap-2 md:grid-cols-12">
      <input className="md:col-span-4 rounded-2xl border border-line bg-bg px-3 py-2"
        placeholder="Lägg till sak…" value={title} onChange={e=>setTitle(e.target.value)} />
      <input className="md:col-span-1 rounded-2xl border border-line bg-bg px-3 py-2"
        type="number" min="0" placeholder="Antal" value={qty} onChange={e=>setQty(e.target.value===""?"":Number(e.target.value))} />
      <input className="md:col-span-2 rounded-2xl border border-line bg-bg px-3 py-2"
        type="number" min="0" step="0.01" placeholder="Pris" value={price} onChange={e=>setPrice(e.target.value===""?"":Number(e.target.value))} />
      <input className="md:col-span-2 rounded-2xl border border-line bg-bg px-3 py-2"
        placeholder="Länk (valfritt)" value={link} onChange={e=>setLink(e.target.value)} />
      <input className="md:col-span-2 rounded-2xl border border-line bg-bg px-3 py-2"
        placeholder="Bild-URL (valfritt)" value={img} onChange={e=>setImg(e.target.value)} />
      <select className="md:col-span-1 rounded-2xl border border-line bg-bg px-3 py-2"
        value={cat} onChange={e=>setCat(e.target.value)}>
        <option value="">Kategori…</option>
        <option>Mat</option><option>Hem</option><option>Tech</option><option>Katter</option><option>Projekt</option>
      </select>
      <button className="md:col-span-12 rounded-2xl border border-line bg-bg px-3 py-2"
        onClick={()=>{
          if (!title.trim()) return
          addItem(id, {
            title: title.trim(),
            qty: qty === "" ? null : Number(qty),
            price: price === "" ? null : Number(price),
            link: link.trim() || null,
            img: img.trim() || null,
            category: cat || null
          })
          setTitle(""); setQty(""); setPrice(""); setLink(""); setImg(""); setCat("")
        }}>Lägg till</button>
    </div>
  )
}