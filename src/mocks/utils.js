import { render } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"
import React from "react"

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

export function renderWithClient(ui) {
  const testQueryClient = createTestQueryClient()
  const { rerender, ...result } = render(<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>)
  return {
    ...result,
    rerender: (rerenderUi) =>
      rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
  }
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient()
  return ({ children }) => <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
}
