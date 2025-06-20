import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ConfidenceMark } from './ConfidenceMark';
import ConfidenceBubbleMenu from './ConfidenceBubbleMenu';
import React, { useEffect } from 'react';

const STORAGE_KEY = 'inkweight-doc';

export default function InkEditor() {
  const editor = useEditor({
    extensions: [StarterKit, ConfidenceMark],
    content: localStorage.getItem(STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(STORAGE_KEY) as string)
      : '<p>Start writing…</p>',
    editorProps: {
      attributes: {
        class: 'w-full focus:outline-none'
      }
    }
  });

  // Autosave to LocalStorage
  useEffect(() => {
    if (!editor) return;
    const save = () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(editor.getJSON()));
    };
    editor.on('update', save);
    return () => {
      editor.off('update', save);
    };
  }, [editor]);

  const exportHTML = () => {
    if (!editor) return;
    const html = editor.getHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  const toggleLowConfidence = () => {
    document.body.classList.toggle('show-low-confidence-only');
  };

  return (
    <div>
      <div className="mb-2 flex items-center gap-4">
        <button
          onClick={exportHTML}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Export HTML
        </button>
        <button
          onClick={toggleLowConfidence}
          className="px-3 py-1 bg-gray-600 text-white rounded"
        >
          Toggle Low Confidence View
        </button>
      </div>
      <div className="flex justify-center bg-gray-100 py-6 min-h-screen overflow-y-auto">
        <div className="bg-white shadow page w-[816px] min-h-[1056px] p-8">
          <EditorContent editor={editor} />
          <ConfidenceBubbleMenu editor={editor} />
        </div>
      </div>
    </div>
  );
} 