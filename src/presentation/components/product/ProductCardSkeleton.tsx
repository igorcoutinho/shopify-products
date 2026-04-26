import { messages } from '../../../content/messages'
import { productSkeleton } from '../../ui/productUi'
import { productCardStyles as styles } from './ProductCard.styles.ts'

export function ProductCardSkeleton() {
  return (
    <div
      className={styles.page}
      aria-busy="true"
      aria-label={messages.ui.loadingProduct}
    >
      <div className={`${styles.card} animate-pulse`}>
        <div className={productSkeleton.image} />
        <div className="mt-2 flex flex-wrap justify-start gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={productSkeleton.swatch} />
          ))}
        </div>
        <div className="mt-1 h-4 w-2/3 rounded bg-neutral-200" />
        <div className="mt-1 h-5 w-4/5 rounded bg-neutral-200" />
        <div className="mt-2 h-4 w-1/3 rounded bg-neutral-200" />
      </div>
    </div>
  )
}
