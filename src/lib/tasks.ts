import prisma from '@/lib/prisma'
// import { cookies } from "next/headers";
import {stackServerApp} from "@/stack";


export async function getNotes() {
    const user = await stackServerApp.getUser(); // Directly fetch user from Stack Auth
    // console.log("TRYING TO FETCH NOTES FOR USER ");
    // console.log(user);
    if (!user || !user.primaryEmail) return []; // User not logged in
    // console.log("user.primaryEmail is " + user.primaryEmail);
    return prisma.tasks.findMany({
            where: {
                username: user.primaryEmail,
            },
        }
    );
}

// export async function createNote(data: { note_content: string; }) {
//     return await prisma.task.create({
//             text_content: "charlie"
//     })
// }

// export async function updateNote(data: { note_content: string; }) {
//     return await prisma.tasks.update({
//         data
//     })
// }