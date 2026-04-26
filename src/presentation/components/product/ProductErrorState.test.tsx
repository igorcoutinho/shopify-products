import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { messages } from '../../../content/messages'
import { ProductErrorState } from './ProductErrorState.tsx'

describe('ProductErrorState', () => {
  it('invokes onRetry when the user presses Retry', async () => {
    const onRetry = vi.fn()
    const user = userEvent.setup()
    render(
      <ProductErrorState
        message="test message"
        onRetry={onRetry}
        retrying={false}
      />,
    )
    expect(screen.getByText('test message')).toBeInTheDocument()
    await user.click(
      screen.getByRole('button', { name: messages.ui.retry }),
    )
    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
