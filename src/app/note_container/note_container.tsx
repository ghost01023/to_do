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


export default function NoteContainer() {
    return(
    <section className="note-container">
      {/* <h1>Hello</h1> */}
      {
        flowerImageLinks.map((link, ind) => <NoteCard imgLink={link} key={ind}></NoteCard>)
      }
    </section>
    )
}