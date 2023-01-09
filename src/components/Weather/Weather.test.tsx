import { cleanup, screen, fireEvent } from "@testing-library/react"
import App from "../../App"
import { renderWithClient } from "../../mocks/utils"
import getCurrentDay from "./getCurrentDay"

describe("<Weather>", () => {
  beforeEach(() => {
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
  })
  afterEach(cleanup)

  it("renders location header component with data <WeatherHeader>", async () => {
    renderWithClient(<App />)
    expect(await screen.findByText(/Seattle/i)).toBeInTheDocument()
    expect(await screen.findByText(/20°/i)).toBeInTheDocument()
  })

  it("renders weather day forecast component with data <WeatherDayForecast>", async () => {
    renderWithClient(<App />)
    const timeText = screen.queryByText("12:00 AM")
    expect(timeText).toBeNull()
    expect(await screen.findByText(/12:00 PM/i)).toBeInTheDocument()
  })

  it("renders week forecast component with data <WeatherForecast>", async () => {
    renderWithClient(<App />)
    expect(await screen.findByText(/sat/i)).toBeInTheDocument()
    expect(await screen.findByText(/sun/i)).toBeInTheDocument()
    expect(await screen.findByText(/mon/i)).toBeInTheDocument()
    expect(await screen.findByText(/tue/i)).toBeInTheDocument()
    expect(await screen.findByText(/wed/i)).toBeInTheDocument()
  })

  it("test if a forecast day is clicked <WeatherForecast>", async () => {
    renderWithClient(<App />)

    expect(await screen.findByText(/fri forecast/i)).toBeInTheDocument()
    // eslint-disable-next-line testing-library/no-node-access
    const divElement = screen.getByText("Sun").closest("div")
    if (divElement) fireEvent.click(divElement)
    expect(await screen.findByText(/sun forecast/i)).toBeInTheDocument()
  })

  it("test if getCurrentDay function returns current day", async () => {
    expect(getCurrentDay(1673395200)).toEqual("Wed")
    expect(getCurrentDay(1673244000)).toEqual("Mon")
  })
})
