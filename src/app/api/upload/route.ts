import { NextResponse } from "next/server";
import { uploadBlob } from "@/lib/azure/uploadBlob";
import { slugify } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const client = String(formData.get("client") ?? "");
    const event = String(formData.get("event") ?? "");
    const reportDate = String(formData.get("reportDate") ?? "");
    const file = formData.get("file");

    if (!client || !event || !reportDate || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Client, event, report date, and CSV file are required." },
        { status: 400 },
      );
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      return NextResponse.json({ error: "Only CSV files are supported." }, { status: 400 });
    }

    const result = await uploadBlob({
      clientSlug: slugify(client),
      eventSlug: slugify(event),
      reportDate,
      file,
    });

    return NextResponse.json({ upload: result }, { status: 201 });
  } catch (error) {
    console.error("Failed to upload Azure blob", error);
    return NextResponse.json(
      { error: "Upload is unavailable. Check server Azure configuration." },
      { status: 503 },
    );
  }
}
