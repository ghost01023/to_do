import prisma from '@/lib/prisma'
// import { cookies } from "next/headers";
import {stackServerApp} from "@/stack";

export async function POST(req: Request) {
    const user = await stackServerApp.getUser()
    if (!user || !user.primaryEmail) return [];
    const body = await req.json(); // Parse request body
    const {noteId, newContent} = body;

    if (!noteId || !newContent) {
        return new Response("Missing parameters", {status: 400});
    }

    const updatedNote = await prisma.tasks.update({
        where: {
            username: user.primaryEmail,
            id: noteId
        },
        data: {note_content: newContent}
    });

    return new Response(JSON.stringify(updatedNote), {status: 200});
}