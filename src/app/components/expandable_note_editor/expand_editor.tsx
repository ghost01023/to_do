import React, { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Minimize2, Maximize2 } from 'lucide-react';

const ExpandableNoteEditor = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [content, setContent] = useState('Click to edit this note...');

    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
    });

    return (
        <div className={`
      fixed 
      transition-all 
      duration-300 
      ease-in-out 
      bg-white 
      rounded-lg 
      shadow-lg 
      ${isExpanded ?
            'top-0 left-0 right-0 bottom-0 m-4 p-6 z-50' :
            'w-64 h-40 m-4 p-4 cursor-pointer hover:shadow-xl'
        }
    `}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Quick Note</h3>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                    {isExpanded ?
                        <Minimize2 className="w-5 h-5 text-gray-600" /> :
                        <Maximize2 className="w-5 h-5 text-gray-600" />
                    }
                </button>
            </div>

            {/* Content */}
            <div className={`
        overflow-auto
        ${isExpanded ? 'h-[calc(100%-4rem)]' : 'h-[calc(100%-2.5rem)]'}
      `}>
                {isExpanded ? (
                    <EditorContent
                        editor={editor}
                        className="prose max-w-none focus:outline-none"
                    />
                ) : (
                    <div
                        className="text-gray-600 text-sm line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                )}
            </div>

            {/* Optional status bar */}
            <div className="absolute bottom-2 right-4 text-xs text-gray-400">
                {isExpanded ? 'Editor mode' : 'Preview mode'}
            </div>
        </div>
    );
};

export default ExpandableNoteEditor;