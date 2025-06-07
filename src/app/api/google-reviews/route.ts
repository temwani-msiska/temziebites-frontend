import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get("placeId");
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) {
    return NextResponse.json({ error: "Missing placeId or API key" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    );
    const data = await response.json();
    if (data.result?.reviews) {
      return NextResponse.json({ reviews: data.result.reviews }, { status: 200 });
    } else {
      return NextResponse.json({ reviews: [] }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching Google Reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}