import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { placeId } = req.query;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) {
    return res.status(400).json({ error: "Missing placeId or API key" });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    );
    const data = await response.json();
    if (data.result?.reviews) {
      res.status(200).json({ reviews: data.result.reviews });
    } else {
      res.status(200).json({ reviews: [] });
    }
  } catch (error) {
    console.error("Error fetching Google Reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}