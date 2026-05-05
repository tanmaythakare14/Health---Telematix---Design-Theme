import { createContext, useContext, useState } from 'react'

const STORAGE_KEY = 'ht_demo_variant'

const VariantContext = createContext({ variant: 1, setVariant: () => {} })

export function VariantProvider({ children }) {
  const [variant, setVariantState] = useState(() => {
    const n = parseInt(localStorage.getItem(STORAGE_KEY), 10)
    return [1, 2, 4, 5].includes(n) ? n : 1
  })

  function setVariant(v) {
    setVariantState(v)
    localStorage.setItem(STORAGE_KEY, String(v))
  }

  return (
    <VariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </VariantContext.Provider>
  )
}

export function useVariant() {
  return useContext(VariantContext)
}
