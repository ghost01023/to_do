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
import {FloatingMenu, EditorContent, EditorProvider, useCurrentEditor, Editor} from '@tiptap/react'
import React, {useEffect, useState} from 'react'
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

}

let GlobalEditor: Editor | null = null;

const MenuBar = ({syncNoteDiv, setShowEditor, noteContent}: MenuBarProps) => {

    const {editor} = useCurrentEditor();
    GlobalEditor = editor;
    const [syncing, setSyncing] = useState(false);
    const undo = () => {
        editor?.chain().focus().undo().run();
    };


    const redo = () => {
        editor?.chain().focus().redo().run();
    };

    const syncCurrentNote = ({syncNoteDiv}: MenuBarProps) => {
        setSyncing(true);
        console.log("syncNote has the following innerHTML");
        console.log(syncNoteDiv?.innerHTML);
        const content = extractHTMLContent();
        if (content && syncNoteDiv) {
            syncNoteDiv.innerHTML = content;
        } else if (content && !syncNoteDiv) {

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
        <div className={"tip-tap-container"}>
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
            <div className="control-group">
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
                        onClick={() => syncCurrentNote({syncNoteDiv, setShowEditor, noteContent})}
                        className="tip-tap-btn sync-btn flex flex-row flex-nowrap gap-x-1 items-center"
                    >Sync
                        <SyncIcon
                            syncing={syncing}
                        ></SyncIcon>
                    </button>
                    <button className={"bg-red-500 rounded px-1 text-white editor-close-btn"}
                        onClick={(elem: React.MouseEvent<HTMLButtonElement>) => {
                            if (syncNoteDiv) {
                                syncCurrentNote({syncNoteDiv, setShowEditor, noteContent});
                            }
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

export const TipTapEditor = ({ noteContent, noteData, setNoteData, syncNoteDiv, setShowEditor, setNewNoteButton }: EditorProps) => {
    // console.log(noteData);


    useEffect(() => {
        if (!syncNoteDiv) return;
        if (!GlobalEditor) return; // Ensure editor is available before attaching the listener

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.altKey && event.key === "Enter" && syncNoteDiv) {
                console.log("Syncing...");

                console.log("Editor Content:", GlobalEditor?.getHTML());
                syncNoteDiv.innerHTML = GlobalEditor?.getHTML() || "";
            } else if (event.ctrlKey && event.altKey && event.key === "Backspace") {
                console.log("Closing...");
                setNewNoteButton(true);
                syncNoteDiv.innerHTML = GlobalEditor?.getHTML() || "";

            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [syncNoteDiv]); // Depend on editor to ensure it's available before adding event listener

    const [hasAddedNote, setHasAddedNote] = useState(false);
    useEffect(() => {
        if (!syncNoteDiv && !hasAddedNote) {
            setNoteData((prevNoteData: Note[]) => [
                ...prevNoteData,
                {
                    "id": Date.now(),
                    "dateCreated": Date.now(),
                    "dateModified": Date.now(),
                    "content": "New note"
                }
            ]);
            setHasAddedNote(true);
        }
    }, [syncNoteDiv, hasAddedNote, setNoteData]);

    if (!syncNoteDiv && !hasAddedNote) {
        return <div>Creating new note...</div>;
    }

    return (
        <div className={"tip-tap-editor-container fixed inset-0 flex items-start pt-[5%] justify-center bg-red-200 bg-opacity-40 z-50"}>
            <EditorProvider
                slotBefore={
                    <MenuBar
                        syncNoteDiv={syncNoteDiv}
                        noteContent={noteContent}
                        setShowEditor={setShowEditor}
                    />
                }
                extensions={extensions}
                content={noteContent}
            />
        </div>
    );
};
