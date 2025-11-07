import { Item } from "../types"
import { useLists } from "../store/lists"
import clsx from "clsx"

export default function ItemCard({ listId, item }: { listId: string, item: Item }) {
  const { toggleItem, removeItem } = useLists()

  return (
    <div className={clsx("rounded-2xl border p-3", "border-line bg-[#0b1320]")}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-1"
          checked={item.done}
          onChange={()=>toggleItem(listId, item.id)}
        />
        <div className="flex-1">
          <div className="font-semibold">
            {item.title} {item.qty ? <span className="text-muted">• x{item.qty}</span> : null}
            {typeof item.price === "number" ? <span className="text-muted"> • {item.price.toFixed(2)} kr</span> : null}
          </div>
          {item.img ? <img src={item.img} alt="bild" className="mt-2 w-full rounded-xl" /> : null}
          <div className="mt-1 text-sm text-muted">{item.category ?? ""}</div>
          {item.link ? <a className="text-sm underline" target="_blank" rel="noreferrer" href={item.link}>Länk</a> : null}
        </div>
        <button
          className="rounded-xl border border-line px-2 py-1 text-sm"
          onClick={()=>removeItem(listId, item.id)}
          aria-label="Ta bort"
          title="Ta bort"
        >
          Ta bort
        </button>
      </div>
    </div>
  )
}