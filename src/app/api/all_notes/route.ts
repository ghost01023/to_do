import { NextResponse } from "next/server";
import {getNotes} from "@/lib/tasks"

export async function GET() {
    // console.log("TRYING TO RUN /all_notes ROUTE...");
    const userNotes = await getNotes();
    return NextResponse.json(userNotes);
}
