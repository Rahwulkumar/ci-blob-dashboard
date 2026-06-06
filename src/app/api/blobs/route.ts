import { NextResponse } from "next/server";
import { listBlobs } from "@/lib/azure/listBlobs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get("prefix") ?? undefined;
    const blobs = await listBlobs(prefix);

    return NextResponse.json({ blobs });
  } catch (error) {
    console.error("Failed to list Azure blobs", error);
    return NextResponse.json(
      { error: "Blob listing is unavailable. Check server Azure configuration." },
      { status: 503 },
    );
  }
}
