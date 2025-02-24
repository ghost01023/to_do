import React from "react";

interface NewNoteButtonProps {
    setCreateNewNote: React.Dispatch<React.SetStateAction<boolean>>;
    setShowEditor: (elem: React.MouseEvent<HTMLElement>) => void;
}


const NewNoteButton = ({setCreateNewNote, setShowEditor}: NewNoteButtonProps) => {
    return (
        <button
            onClick={(elem: React.MouseEvent<HTMLElement>) => {
            setCreateNewNote(true);
            setShowEditor(elem);
        }}
            className="new-note-btn fixed right-5 bottom-4 text-2xl px-5 py-2.5 text-center inline-flex border-2 border-solid border-red-400 bg-red-400 rounded-md items-center focus:outline-none active:bg-red-400 transition duration-150 ease-in-out hover:bg-red-200">
            <svg
                className="w-4 h-4 me-2"
                fill="#000000"
                height="65px"
                width="65px"
                version="1.1"
                id="Layer_1"
                viewBox="0 0 512 512"
                xmlSpace="preserve">
                    <g>
                        <g>
                            <path d="M303.02,208.98V0H208.98v208.98H0v94.041h208.98V512h94.041V303.02H512V208.98H303.02z M480.653,271.673h-208.98v208.98
                                h-31.347v-208.98H31.347v-31.347h208.98V31.347h31.347v208.98h208.98V271.673z"/>
                        </g>
                    </g>
            </svg>
            New Note</button>
    )
}

export default NewNoteButton;