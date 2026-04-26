const imageFrame = 'aspect-[3/3.4] w-full rounded-[4px] border border-[#e5e4e7]'

export const productUi = {
  surfacePage: 'bg-[#f8f8f8]',
  imageFrame,
} as const

export const productSkeleton = {
  image: `${imageFrame} bg-neutral-200`,
  swatch: 'h-7 w-7 rounded-full border border-[#e5e4e7] bg-neutral-200',
} as const
