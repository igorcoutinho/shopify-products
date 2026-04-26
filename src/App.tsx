import { messages } from './content/messages'
import { ProductCardContainer } from './presentation/components/product/ProductCardContainer.tsx'
import { SimulateErrorToggle } from './presentation/components/SimulateErrorToggle.tsx'
import { productUi } from './presentation/ui/productUi'

function App() {
  return (
    <div
      className={`flex min-h-svh w-full flex-col ${productUi.surfacePage}`}
    >
      <div className="flex w-full flex-1 flex-col items-center justify-center px-4">
        <ProductCardContainer />
      </div>
      <footer className="shrink-0 w-full border-t border-neutral-200 bg-white/95 py-4 shadow-[0_-2px_16px_rgba(0,0,0,0.06)] backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-1.5 px-4">
          <p className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">
            {messages.ui.devFooter}
          </p>
          <SimulateErrorToggle />
        </div>
      </footer>
    </div>
  )
}

export default App
