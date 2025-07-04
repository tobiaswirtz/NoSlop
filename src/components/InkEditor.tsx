import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ConfidenceMark } from './ConfidenceMark';
import React, { useEffect } from 'react';
import ConfidenceBubbleMenu from './ConfidenceBubbleMenu';
import { scoreStatement } from '../llm';

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

  // Auto-save to LocalStorage
  useEffect(() => {
    if (!editor) return;
    const handler = () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(editor.getJSON()));
    };
    editor.on('update', handler);
    return () => {
      editor.off('update', handler);
    };
  }, [editor]);

  // Auto-score selection when user applies mark first time
  const handleAutoScore = async () => {
    if (!editor) return;
    if (editor.isActive('confidence')) return; // already has
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, ' ');
    if (!text.trim()) return;
    const res = await scoreStatement(text.trim());
    const conf = res?.confidence ?? 100;
    (editor as any)
      .chain()
      .focus()
      .setConfidence(conf)
      .run();
  };

  useEffect(() => {
    const handler = () => {
      if (!editor?.state.selection.empty) {
        handleAutoScore();
      }
    };
    editor?.on('selectionUpdate', handler);
    return () => {
      editor?.off('selectionUpdate', handler);
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
      <div className="flex justify-center py-6 min-h-screen overflow-y-auto">
        <div className="bg-white page w-[816px] min-h-[1056px] p-8">
          <EditorContent editor={editor} />
          <ConfidenceBubbleMenu editor={editor} />
        </div>
      </div>
    </div>
  );
} 