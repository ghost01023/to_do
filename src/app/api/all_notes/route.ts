import { NextResponse } from "next/server";
import {getNotes} from "@/lib/tasks"

export async function GET() {
    console.log("TRYING TO RUN /all_notes ROUTE...");
    const userNotes = await getNotes();
    // console.log("NOTES FOR THIS USER ARE...");
    // console.log(userNotes);
    return NextResponse.json(userNotes);
}
