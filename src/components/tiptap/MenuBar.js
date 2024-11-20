import PropTypes from 'prop-types';
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

MenuBar.propTypes = {
    editor: PropTypes.object,
};
function MenuBar({ editor }) {
    if (!editor) {
        return null
    }

    return (
        <div className="menu-bar">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                bold
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                italic
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                strike
            </button>
        </div>
    )
}

export default function TiptapEditor()
{
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello World!</p>',
    })

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

