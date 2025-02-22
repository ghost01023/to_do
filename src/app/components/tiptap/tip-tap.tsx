// FEATURES OF THE NOTE-EDITOR

import History from "@tiptap/extension-history";
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
// import
import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'
import Image from "next/image";

// BUTTON ASSETS FOR THE NOTE-EDITOR
import BoldIcon from "../buttons/bold";





export const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [History, Document, Paragraph, Text, Italic, Bold, Strike, BulletList, ListItem, TaskList, TaskItem],
    content: `
        Start Creating Content...
      `,
  })

  const undo = () => {
  editor?.chain().focus().undo().run();
};

// Redo function
const redo = () => {
  editor?.chain().focus().redo().run();
};

  if (!editor) {
    return (
    <div>
      <h1>Failed to load editor!</h1>
    </div>)
  }

  return (
    <div className={"tip-tap-container"}>
      <div className="control-group">
        <div className="button-group flex flex-row gap-x-3 mb-3">
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'style-btn-active tip-tap-btn' : 'tip-tap-btn'}
          >
            Toggle italic
          </button>
          <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'style-btn-active tip-tap-btn' : 'tip-tap-btn'}
          >
          
            <BoldIcon />
          </button>
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
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}