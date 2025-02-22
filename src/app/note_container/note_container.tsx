"use client";

import { NoteCard } from "./note_card/note_card"
const flowerImageLinks = [
    "https://assets.codepen.io/210284/flower-1.jpg",
    "https://assets.codepen.io/210284/flower-2.jpg",
    "https://assets.codepen.io/210284/flower-3.jpg",
    "https://assets.codepen.io/210284/flower-4.jpg",
    "https://assets.codepen.io/210284/flower-5.jpg",
    "https://assets.codepen.io/210284/flower-6.jpg",
    "https://assets.codepen.io/210284/flower-7.jpg",
    "https://assets.codepen.io/210284/flower-8.jpg",
    "https://assets.codepen.io/210284/flower-10.jpg",
    "https://assets.codepen.io/210284/flower-3.jpg",
    "https://assets.codepen.io/210284/flower-4.jpg",
    "https://assets.codepen.io/210284/flower-5.jpg",
    "https://assets.codepen.io/210284/flower-6.jpg",
    "https://assets.codepen.io/210284/flower-7.jpg",
    "https://assets.codepen.io/210284/flower-8.jpg",
]

interface NoteContainerProps {
  noteData: Array<object>
}


export default function NoteContainer({noteData}:NoteContainerProps) {
  let frontRunnerMonth = 0;
  let frontRunnerYear = 0;
    return(
    <section className="note-container">
      {/* <h1>Hello</h1> */}
      {
        noteData.map((contentObject, ind) => {
        const date = new Date(contentObject.dateCreated * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        console.log("year is " + year + " and front runner year is " + frontRunnerYear);
        if (year !== frontRunnerYear || month !== frontRunnerMonth) {
          if (year !== frontRunnerYear) {
          frontRunnerYear = year;
          return(
            <>
            <p className={"text-red-400"}>New year</p>
          <NoteCard htmlContent={contentObject.content} key={ind}></NoteCard>
          </>
          )
        }
        if (month !== frontRunnerMonth) {
          frontRunnerMonth = month;
          return(
            <>
            <p className={"text-blue-600"}>New Month</p>
            <NoteCard htmlContent={contentObject.content} key={ind}></NoteCard>
            </>
          )
        }}
         else {
        return (<NoteCard htmlContent={contentObject.content} key={ind}></NoteCard>);
        }
      })
      }
    </section>
    )
}