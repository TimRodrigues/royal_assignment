import App from "./App"
import { renderWithClient } from "./mocks/utils"
import { rest } from "msw"
import { server } from "./setupTests"
import { cleanup, screen } from "@testing-library/react"

describe("<App>", () => {
  afterEach(cleanup)

  it("renders loading spinner before getting location", async () => {
    renderWithClient(<App />)
    const loader = screen.getByTestId("loader")
    expect(loader).toBeInTheDocument()
  })

  it("renders error message if location is not available", async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success, error) =>
        Promise.resolve(
          error({
            message: "User denied Geolocation",
          })
        )
      ),
    }
    // @ts-ignore
    navigator.geolocation = mockGeolocation

    renderWithClient(<App />)

    expect(await screen.findByText(/User denied Geolocation/i)).toBeInTheDocument()
  })

  it("renders weather data after getting location", async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 10,
              longitude: 10,
            },
          })
        )
      ),
    }
    // @ts-ignore
    navigator.geolocation = mockGeolocation

    renderWithClient(<App />)

    expect(await screen.findByText(/Seattle/i)).toBeInTheDocument()
  })

  it("renders error message if weather data is not available", async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 10,
              longitude: 10,
            },
          })
        )
      ),
    }
    // @ts-ignore
    navigator.geolocation = mockGeolocation

    renderWithClient(<App />)

    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: "Something went wrong" }))
      })
    )

    expect(await screen.findByText(/Something went wrong/i)).toBeInTheDocument()
  })
})
