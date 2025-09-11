import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'

type ToastType = 'info' | 'success' | 'error'

type ToastItem = { id: number; text: string; type: ToastType }

type ToastContextType = {
  toast: (text: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

export default function Toaster({ children }: PropsWithChildren) {
  const [items, setItems] = useState<ToastItem[]>([])

  function toast(text: string, type: ToastType = 'info') {
    const id = Date.now()
    setItems((prev) => [...prev, { id, text, type }])
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div className="fixed bottom-5 right-5 z-50 space-y-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={`rounded-xl px-4 py-2 shadow-lg text-white ${
              t.type === 'success'
                ? 'bg-green-600'
                : t.type === 'error'
                ? 'bg-red-600'
                : 'bg-slate-700'
            }`}
          >
            {t.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
