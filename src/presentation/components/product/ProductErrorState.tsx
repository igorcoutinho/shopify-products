import { messages } from '../../../content/messages'
import { productCardStyles as styles } from './ProductCard.styles.ts'

type Props = {
  message: string
  onRetry: () => void
  retrying: boolean
}

export function ProductErrorState({ message, onRetry, retrying }: Props) {
  return (
    <div className={styles.page} role="alert">
      <div className="w-full max-w-[360px] rounded-md border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-900 shadow-sm">
        <p className="font-medium">{messages.ui.errorPageTitle}</p>
        <p className="mt-1 opacity-90">{message}</p>
        <button
          type="button"
          onClick={onRetry}
          disabled={retrying}
          className="mt-3 rounded border border-red-300 bg-white px-3 py-1.5 text-sm text-red-900 hover:bg-red-100 disabled:opacity-50"
        >
          {retrying ? messages.ui.retrying : messages.ui.retry}
        </button>
      </div>
    </div>
  )
}
