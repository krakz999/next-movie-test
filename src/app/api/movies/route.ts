import { SortOrder, tmdb } from "@/lib/tmdb";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // We would normally validate the query parameters here in a real-life example
  const page = +(searchParams.get("page") || "1");
  const sortBy = (searchParams.get("sort_by") || "desc") as SortOrder;

  const movies = await tmdb.fetchMovies({ page, sortBy });

  return NextResponse.json(movies, { headers: corsHeaders });
}
