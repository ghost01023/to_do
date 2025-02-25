// FEATURES OF THE NOTE-EDITOR
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Document from '@tiptap/extension-document'
import Italic from '@tiptap/extension-italic'
import Bold from '@tiptap/extension-bold'
import Strike from '@tiptap/extension-strike'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import PlaceHolder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style'
import {Color} from '@tiptap/extension-color';
import StarterKit from "@tiptap/starter-kit";
import {FloatingMenu, EditorContent, EditorProvider, useCurrentEditor} from '@tiptap/react'
import React, {useEffect, useState} from 'react'
import "@/app/tip-tap.css";
// import { Dispatch } from 'react'

// BUTTON ASSETS FOR THE NOTE-EDITOR
import BoldIcon from "../buttons/bold_icon";
import {Note} from "@/types/component_types"
import ItalicIcon from "@/app/components/buttons/italic_icon";
import BulletListIcon from "@/app/components/buttons/bulletlist_icon";
import {SyncIcon} from "@/app/components/buttons/sync_icon";


interface MenuBarProps {
    syncNoteDiv?: HTMLDivElement | undefined;
    noteContent: string;
    setShowEditor: (elem: React.MouseEvent<HTMLElement>) => void;
    noteData: Note[];
    setNoteData: React.Dispatch<React.SetStateAction<Note[]>>;
}



const MenuBar = ({syncNoteDiv, setShowEditor, noteContent, noteData, setNoteData}: MenuBarProps) => {

    const {editor} = useCurrentEditor();
    const [syncing, setSyncing] = useState(false);
    const undo = () => {
        editor?.chain().focus().undo().run();
    };


    const redo = () => {
        editor?.chain().focus().redo().run();
    };

    const syncCurrentNote = ({syncNoteDiv}: MenuBarProps) => {
        setSyncing(true);
        // console.log("syncNote has the following innerHTML");
        // console.log(syncNoteDiv?.innerHTML);
        const content = extractHTMLContent();
        if (content && syncNoteDiv) {
            //RUNS IF NOTE EXISTS, THEREFORE syncNoteDiv EXISTS
            //TRY TO UPDATE ON DATABASE
            // console.log("id of the syncnote is ");
            //
            // console.log(syncNoteDiv?.id);
            // console.log("request body will be");
            // console.log(JSON.stringify({id: syncNoteDiv.id, note_content: content}));
            const jsonObj = {id: parseInt(syncNoteDiv.id), note_content: content};
            fetch("/api/update_note", {
                method: "POST", // or PATCH
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(jsonObj),
            }).then(res => res.json()).then(data => {
                // console.log("ATTEMPTED TO SYNC NOTE DATA...");
                // console.log(data);
                if (data.note_content === content) {
                    setSyncing(false);
                    // syncNoteDiv.innerHTML = content;
                    //update the noteData array
                    const index = noteData.findIndex(note => note.id === data.id);
                    setNoteData(prev =>
                        prev.map((note, i) =>
                            i === index ? {...note, note_content: data.note_content} : note
                        )
                    );

                }
            });
        } else if (content && !syncNoteDiv) {
            console.log("WILL ATTEMPT TO CREATE NEW NOTE");
            fetch("/api/create_note", {
                method: "POST", // or PATCH
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: 0, note_content: content}),
            }).then(res => res.json()).then(data => {
                console.log("SUCCESSFULLY RAN CREATE_NOTE ROUTE...");
                data.date_created = new Date(data.date_created).getTime();
                data.date_modified = new Date(data.date_modified).getTime();
                console.log(data);
                setNoteData((prev) => [...prev, data]);
            })
        }
    }


    const extractContent = () => {
        // const content = editor?.getJSON();
        // console.log(content);
    }

    const extractHTMLContent = () => {
        const content = editor?.getHTML();
        // console.log(content);
        return content;
    }


    if (!editor) {
        return (
            <div>
                <h1>Failed to load editor!</h1>
            </div>)
    }

    return (
        <div className={"tip-tap-container bg-gray-800 bg-opacity-80 p-7 rounded h-[70vh] overflow-y-scroll"}>
            {editor &&
                <FloatingMenu
                    className="floating-menu"
                    tippyOptions={{duration: 100}}
                    editor={editor}>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                        className={editor.isActive('heading', {level: 1}) ? 'style-btn-active tip-tap-btn mr-2' : 'tip-tap-btn mr-2'}
                    >
                        H1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                        className={editor.isActive('heading', {level: 2}) ? 'style-btn-active tip-tap-btn mr-2' : 'tip-tap-btn mr-2'}
                    >
                        H2
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'style-btn-active tip-tap-btn mr-2' : 'tip-tap-btn mr-2'}
                    >
                        Bullet list
                    </button>
                </FloatingMenu>}
            <div className="control-group top-2">
                <div className="button-group flex flex-row flex-wrap gap-x-3 mb-3">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'style-btn-active tip-tap-btn' : 'tip-tap-btn'}
                    >

                        <BoldIcon/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('italic') ? 'style-btn-active tip-tap-btn' : 'tip-tap-btn'}
                    >
                        <ItalicIcon/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'style-btn-active tip-tap-btn' : 'tip-tap-btn'}
                    >
                        <BulletListIcon/>
                    </button>
                    <button
                        onClick={undo}
                        disabled={!editor?.can().undo()}
                        className={editor?.can().undo() ? 'style-btn-active tip-tap-btn' : 'tip-tap-btn'}
                    >
                        Undo
                    </button>
                    <button
                        onClick={redo}
                        disabled={!editor?.can().redo()}
                        className={editor?.can().redo() ? 'style-btn-active tip-tap-btn' : 'tip-tap-btn'}
                    >
                        Redo
                    </button>
                    <br/>
                    <button
                        className={"tip-tap-btn"}
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    >
                        Horizontal rule
                    </button>
                    <button
                        onClick={extractContent}
                        className="tip-tap-btn"
                    >
                        getJSON()
                    </button>
                    <button
                        onClick={extractHTMLContent}
                        className="tip-tap-btn"
                    >
                        getHTML()
                    </button>
                    <button
                        onClick={() => syncCurrentNote({
                            syncNoteDiv,
                            setShowEditor,
                            noteContent,
                            noteData,
                            setNoteData
                        })}
                        className="tip-tap-btn sync-btn flex flex-row flex-nowrap gap-x-1 items-center"
                    >Sync
                        <SyncIcon
                            syncing={syncing}
                        ></SyncIcon>
                    </button>
                    <button className={"bg-red-500 rounded px-1 text-white editor-close-btn"}
                            onClick={(elem: React.MouseEvent<HTMLButtonElement>) => {
                                syncCurrentNote({syncNoteDiv, setShowEditor, noteContent, noteData, setNoteData});

                                setShowEditor(elem)
                            }}
                    >
                        Close
                    </button>
                </div>
            </div>
            <div className={"editor-content h-screen overflow-y-scroll"}>
                <EditorContent editor={editor}/>
            </div>
        </div>
    )
}

const extensions = [
    Document,
    Paragraph,
    Text,
    Italic,
    Bold,
    Strike,
    BulletList,
    ListItem,
    TaskList,
    Color.configure({types: [TextStyle.name, ListItem.name]}),
    TaskItem.configure({
        nested: true,
    }),
    PlaceHolder.configure({
        placeholder: `Write something new...`,
    }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false
        },
    }),
];

interface EditorProps {
    noteContent: string,
    noteData: Note[],
    setNoteData: React.Dispatch<React.SetStateAction<Note[]>>,
    syncNoteDiv: HTMLDivElement | undefined,
    setShowEditor: (elem: React.MouseEvent<HTMLElement>) => void;
    setNewNoteButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TipTapEditor = ({
                                 noteContent,
                                 noteData,
                                 setNoteData,
                                 syncNoteDiv,
                                 setShowEditor,
                                 setNewNoteButton
                             }: EditorProps) => {
    // console.log(noteData);


    useEffect(() => {
        // Ensure editor is available before attaching the listener

        const handleKeyDown = (event: KeyboardEvent) => {
            console.log("handling key down");
            if (event.ctrlKey && event.altKey && event.key === "Enter" && syncNoteDiv) {
                console.log("Syncing...");
                (document.querySelector(".editor-sync-btn") as HTMLElement)?.click();

            } else if (event.ctrlKey && event.altKey && event.key === "Backspace") {
                console.log("Closing...");
                setNewNoteButton(true);
                (document.querySelector(".editor-close-btn") as HTMLElement)?.click();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [setNewNoteButton, syncNoteDiv]); // Depend on editor to ensure it's available before adding event listener

    return (
        <div
            className={"tip-tap-editor-container fixed inset-0 flex items-start pt-[5%] justify-center bg-red-200 bg-opacity-40 z-50 text-amber-50"}>
            <EditorProvider
                slotBefore={
                    <MenuBar
                        syncNoteDiv={syncNoteDiv}
                        noteContent={noteContent}
                        setShowEditor={setShowEditor}
                        noteData={noteData}
                        setNoteData={setNoteData}
                    />
                }
                extensions={extensions}
                content={noteContent}
            />
        </div>
    );
};
