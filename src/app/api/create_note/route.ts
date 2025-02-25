import prisma from '@/lib/prisma'
// import { cookies } from "next/headers";
import {stackServerApp} from "@/stack";

export async function POST(req: Request) {
    const user = await stackServerApp.getUser()
    if (!user || !user.primaryEmail) return [];
    const body = await req.json(); // Parse request body
    const {id, note_content} = body;
    // console.log("ON SERVER SIDE, NEW TASK IS");
    // console.log(body);
    if (id !== 0 || !note_content) {
        return new Response("Missing parameters", {status: 400});
    }

    // console.log("SERVER TRYING TO INSERT NEW TASK FOR USER");

    const insertedNote = await prisma.tasks.create({
        data: {
            username: user.primaryEmail,
            note_content: note_content,
        },
    });

    return new Response(JSON.stringify(insertedNote), {status: 200});
}