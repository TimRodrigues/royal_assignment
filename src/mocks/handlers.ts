import { rest } from "msw"
import { mockForecastData } from "./mockData"

export const handlers = [
  rest.get("*/weather*", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "Seattle",
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d",
          },
        ],
        main: {
          temp: 20,
        },
      })
    )
  }),
  rest.get("*/forecast*", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ ...mockForecastData }))
  }),
]
