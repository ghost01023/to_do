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
import { Color } from '@tiptap/extension-color';
import StarterKit from "@tiptap/starter-kit";
import { FloatingMenu, EditorContent, EditorProvider, useCurrentEditor } from '@tiptap/react'
import React, {useEffect, useState} from 'react'
// import { Dispatch } from 'react'

// BUTTON ASSETS FOR THE NOTE-EDITOR
import BoldIcon from "../buttons/bold";
import {Note} from "../../page";
import Button from "@/app/components/buttons/italic";

interface MenuBarProps {
  syncNoteDiv?: HTMLDivElement | undefined;
  noteContent: string;
  setShowEditor: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuBar = ({syncNoteDiv, setShowEditor, noteContent}: MenuBarProps) => {
  const {editor} = useCurrentEditor();

const undo = () => {
    editor?.chain().focus().undo().run();
};


const redo = () => {
      editor?.chain().focus().redo().run();
};


const extractContent = () => {
  const content = editor?.getJSON();
  console.log(content);
}

const extractHTMLContent = () => {
  const content = editor?.getHTML();
  console.log(content);
  return content;
}

const syncCurrentNote = ({syncNoteDiv}: MenuBarProps) => {
  console.log("syncNote is currently");

  console.log(syncNoteDiv?.innerHTML);
  const content = extractHTMLContent();
  if (content && syncNoteDiv) {
  syncNoteDiv.innerHTML = content;
  } else if (content && !syncNoteDiv) {
    
  }
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
          tippyOptions={{ duration: 100 }}
          editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'style-btn-active tip-tap-btn mr-2' : 'tip-tap-btn mr-2'}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'style-btn-active tip-tap-btn mr-2' : 'tip-tap-btn mr-2'}
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
          
            <BoldIcon />
          </button>
          <Button buttonType={"italic"} className={"tip-tap-btn"} editor={editor} clickEvent={() => editor.chain().focus().toggleItalic().run()} svgLink={"bold.svg"}></Button>
          <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'style-btn-active tip-tap-btn' : 'tip-tap-btn'}
          >
            Toggle BulletList
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
          className="tip-tap-btn sync-btn"
          >
            Sync
          </button>
          <button
          onClick={() => {
            if (syncNoteDiv) {
              syncCurrentNote({syncNoteDiv, setShowEditor, noteContent});
            }
            setShowEditor(false)
          }}
          >
            Close
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
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
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
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
  syncNoteDiv?: HTMLDivElement | undefined,
  setShowEditor: React.Dispatch<React.SetStateAction<boolean>>
}

interface SyncViaKeyPressProps {
  // event: React.KeyboardEvent;
  syncNoteDiv?: HTMLDivElement;
}

const syncViaKeyPress = ({syncNoteDiv}: SyncViaKeyPressProps) => {
  console.log(syncNoteDiv);
  if (document.querySelector(".sync-btn")) {
    console.log("Button exists");
  }
  if (document.querySelector(".sync-btn")) {
    document?.querySelector(".sync-btn")?.dispatchEvent(new Event('click'));
  }
}

export const TipTapEditor = ({noteContent, noteData, setNoteData, syncNoteDiv, setShowEditor}: EditorProps) => {
  // Handle new note creation
  console.log(noteData);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key === "Enter") {
        console.log("Syncing...");
        syncViaKeyPress({syncNoteDiv})
      } else if(event.ctrlKey && event.altKey && event.key === "Backspace") {
        console.log("Closing...");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
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
  console.log("Tip tap editor is being rendered with the following text content:");
  if (!syncNoteDiv && !hasAddedNote) {
    return <div>Creating new note...</div>;
  }

  return (
      <div
          className={"tip-tap-editor-container fixed top-20 bg-red-200"}
      >
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