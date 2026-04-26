import { useCallback, type KeyboardEvent } from 'react'
import { messages } from '../../../content/messages'
import type { Product, ProductVariant, ProductVariantId } from '../../../domain/entities/product'
import { productCardStyles as styles } from './ProductCard.styles.ts'

type Props = {
  product: Product
  selectedVariant: ProductVariant
  onSelectVariant: (id: ProductVariantId) => void
}

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    amount,
  )
}

export function ProductCardView({ product, selectedVariant, onSelectVariant }: Props) {
  const hasAlternateHover =
    selectedVariant.imagePrimary !== selectedVariant.imageSecondary

  const onSwatchKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const { key } = e
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return
      e.preventDefault()
      const { variants } = product
      const n = variants.length
      const i = variants.findIndex((v) => v.id === selectedVariant.id)
      if (key === 'Home') {
        onSelectVariant(variants[0].id)
        return
      }
      if (key === 'End') {
        onSelectVariant(variants[n - 1].id)
        return
      }
      if (key === 'ArrowRight') {
        onSelectVariant(variants[(i + 1) % n].id)
        return
      }
      onSelectVariant(variants[(i - 1 + n) % n].id)
    },
    [onSelectVariant, product, selectedVariant.id],
  )

  return (
    <article className={styles.card} aria-label={product.title}>
      <div className={`${styles.imageShell} group`}>
        {product.isOnSale ? (
          <span className={styles.badge} role="status">
            {messages.ui.saleBadge}
          </span>
        ) : null}
        <div className="relative h-full w-full">
          <img
            src={selectedVariant.imagePrimary}
            alt=""
            className={`${styles.imageLayer} ${styles.imgTransition} z-[1] object-contain p-2 ${
              hasAlternateHover
                ? 'opacity-100 group-hover:opacity-0'
                : 'opacity-100'
            }`}
            width={400}
            height={480}
            loading="eager"
            decoding="async"
          />
          {hasAlternateHover ? (
            <img
              src={selectedVariant.imageSecondary}
              alt=""
              className={`${styles.imageLayer} ${styles.imgTransition} z-[2] object-contain p-2 opacity-0 group-hover:opacity-100`}
              width={400}
              height={480}
              loading="eager"
              aria-hidden
            />
          ) : null}
        </div>
      </div>

      <div
        className={styles.swatchRow}
        role="listbox"
        tabIndex={0}
        aria-label={messages.ui.colorSwatchGroup}
        onKeyDown={onSwatchKeyDown}
      >
        {product.variants.map((v) => {
          const selected = v.id === selectedVariant.id
          return (
            <button
              key={v.id}
              type="button"
              role="option"
              aria-selected={selected}
              className={styles.swatchBtn}
              onClick={() => onSelectVariant(v.id)}
              title={v.label}
            >
              <span
                className={`${styles.swatchInner} ${selected ? styles.swatchDiscSelected : ''}`}
                style={{ backgroundColor: v.swatchColor }}
              />
            </button>
          )
        })}
      </div>

      <p className={styles.brand}>{product.brand}</p>
      <h1 className={styles.title}>{product.title}</h1>

      <div className={styles.priceRow}>
        {product.isOnSale ? (
          <>
            <span className={styles.compareAt}>
              {formatPrice(product.compareAtPrice, product.currency)}
            </span>
            <span className={styles.salePrice}>
              {formatPrice(product.price, product.currency)}
            </span>
          </>
        ) : (
          <span className={styles.price}>
            {formatPrice(product.price, product.currency)}
          </span>
        )}
      </div>
    </article>
  )
}
