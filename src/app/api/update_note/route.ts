import prisma from '@/lib/prisma'
// import { cookies } from "next/headers";
import {stackServerApp} from "@/stack";

export async function POST(req: Request) {
    const user = await stackServerApp.getUser()
    if (!user || !user.primaryEmail) return [];
    const body = await req.json(); // Parse request body
    const {id, note_content} = body;
    console.log("ON SERVER SIDE, UPDATED NOTE IS");
    console.log(body);
    if (!id || !note_content) {
        return new Response("Missing parameters", {status: 400});
    }

    const updatedNote = await prisma.tasks.update({
        where: {
            username: user.primaryEmail,
            id: id
        },
        data: {note_content: note_content}
    });

    return new Response(JSON.stringify(updatedNote), {status: 200});
}