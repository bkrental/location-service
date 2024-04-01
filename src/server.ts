import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Client, Language } from "@googlemaps/google-maps-services-js";
import cors from "cors";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "local"}` });

const app = express();
const client = new Client({});

app.use(cors());

app.get("/autocomplete", async (req: Request, res: Response) => {
  const keyword = (req.query.input as string) || "";

  const response = await client.placeQueryAutocomplete({
    params: {
      input: keyword,
      key: process.env.GOOGLE_MAP_API_KEY || "",
      language: Language.vi,
      location: "10.76,106.79",
      radius: 50000,
    },
  });

  res.json(response.data);
});

app.get("/places/:placeId", async (req: Request, res: Response) => {
  const placeId = req.params.placeId;

  const response = await client.placeDetails({
    params: {
      place_id: placeId,
      key: process.env.GOOGLE_MAP_API_KEY || "",
      language: Language.vi,
    },
  });

  res.json(response.data);
});

const PORT: number = 8080;

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}!`);
});
