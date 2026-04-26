import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { messages } from '../../content/messages'
import { productQueryKeys } from '../../application/product/queryKeys'
import { PLAIN_TEE_PRODUCT_ID } from '../../config/productId'

const u = messages.ui

function readParam(): boolean {
  return new URLSearchParams(window.location.search).get('simulateError') === '1'
}

export function SimulateErrorToggle() {
  const client = useQueryClient()
  const [on, setOn] = useState(readParam)

  useEffect(() => {
    const sync = () => setOn(readParam())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  const toggle = useCallback(() => {
    const next = new URL(window.location.href)
    if (next.searchParams.get('simulateError') === '1') next.searchParams.delete('simulateError')
    else next.searchParams.set('simulateError', '1')
    history.replaceState({}, '', next)
    setOn(readParam())
    void client.invalidateQueries({ queryKey: productQueryKeys.detail(PLAIN_TEE_PRODUCT_ID) })
  }, [client])

  return (
    <button
      type="button"
      onClick={toggle}
      className={
        on
          ? 'w-full max-w-sm rounded-lg border-2 border-red-500/80 bg-red-100/90 px-4 py-3 text-center text-xs font-semibold text-red-950 transition-colors hover:bg-red-100 sm:text-sm'
          : 'w-full max-w-sm rounded-lg border-2 border-emerald-600/60 bg-emerald-50/95 px-4 py-3 text-center text-xs font-semibold text-emerald-950 transition-colors hover:bg-emerald-100/90 sm:text-sm'
      }
      title={u.devMockTitle}
      aria-pressed={on}
    >
      <span className="uppercase tracking-wide">
        {on ? u.devMockStateOn : u.devMockStateOff}
      </span>
    </button>
  )
}
