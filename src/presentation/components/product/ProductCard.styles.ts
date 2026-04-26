import { productUi } from '../../ui/productUi'

export const productCardStyles = {
  page: `flex w-full flex-col items-center justify-center ${productUi.surfacePage} px-4 py-10`,
  card: 'w-full max-w-[320px] text-left',
  imageShell: `relative ${productUi.imageFrame} overflow-hidden bg-white`,
  badge:
    'absolute left-2 top-2 z-10 rounded-full border-2 border-[#D64545] bg-white px-2.5 py-0.5 text-xs font-medium text-[#D64545]',
  imageLayer: 'absolute inset-0 h-full w-full',
  imgTransition:
    'transition-opacity duration-200 motion-reduce:transition-none',
  swatchRow:
    'mt-2 flex flex-wrap justify-start gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2',
  swatchBtn:
    'group flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-transparent p-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] motion-reduce:transition-none',
  swatchInner:
    'h-full w-full rounded-full border border-black/10 transition group-hover:border-black/30',
  swatchDiscSelected:
    'shadow-[0_0_0_1px_#f8f8f8,0_0_0_2px_#2563EB]',
  brand: 'mt-1 text-sm font-normal text-[#0a0a0a]',
  title: 'mt-0.5 text-lg font-bold text-[#1a2b5b] leading-tight',
  priceRow: 'mt-1.5 flex items-baseline gap-2',
  compareAt: 'text-sm text-[#0a0a0a] line-through',
  salePrice: 'text-base font-medium text-[#D64545]',
  price: 'text-base font-medium text-[#0a0a0a]',
} as const
