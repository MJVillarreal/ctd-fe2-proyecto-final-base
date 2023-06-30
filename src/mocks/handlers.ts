import { rest } from "msw";
import { API_URL } from "../app/constants";


export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    const character = req.url.searchParams.get("character");

    const mockedCitaRespuesta = [
      {
        quote: "Eat my shorts",
        character: "Bart Simpson",
        image: "/static/media/bart.cfa369b39b5dd6795d7e.png",
        characterDirection: "Right",
      },
    ];
    const mockedCitaAleatoria = [
      {
        character: "Homer Simpson",
        quote: "Gah, stupid sexy Flanders!",
        image:
          "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
        characterDirection: "Right",
      },
    ];
      if (character) {
        return res(ctx.status(200), ctx.json(mockedCitaRespuesta));
      }
  
      return res(ctx.status(200), ctx.json(mockedCitaAleatoria));
    }),
];