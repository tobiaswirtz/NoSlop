import { BubbleMenu, Editor } from '@tiptap/react';
import React, { useState, useEffect } from 'react';

interface Props {
  editor: Editor | null;
}

const ConfidenceBubbleMenu: React.FC<Props> = ({ editor }) => {
  const [value, setValue] = useState(100);
  const [assumptions, setAssumptions] = useState<string[]>([]);
  const [newAssumption, setNewAssumption] = useState('');

  if (!editor) return null;

  // Sync local state when selection changes
  useEffect(() => {
    const attrs: any = editor.getAttributes('confidence') || {};
    setValue(attrs.value ?? 100);
    setAssumptions(Array.isArray(attrs.assumptions) ? attrs.assumptions : []);
  }, [editor.state.selection]);

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 150, placement: 'top' }}
      className="bg-white border shadow rounded px-3 py-2 flex flex-col gap-2 w-64"
    >
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={e => {
            const val = parseInt(e.target.value, 10);
            setValue(val);
            (editor as any).chain().focus().setConfidence(val).run();
          }}
          className="w-32"
        />
        <span className="text-sm w-10 text-right">{value}%</span>
      </div>

      <div className="text-xs w-full">
        <span className="font-semibold">Assumptions</span>
        <ul className="mt-1 space-y-0.5 max-h-40 overflow-y-auto">
          {assumptions.map((ass, idx) => (
            <li key={idx} className="flex items-center gap-1">
              <span className="flex-1 break-words">{ass}</span>
              <button
                className="text-red-600 text-[10px]"
                onClick={() => {
                  (editor as any).chain().focus().removeAssumption(idx).run();
                  setAssumptions(assumptions.filter((_, i) => i !== idx));
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add assumption…"
          value={newAssumption}
          onChange={e => setNewAssumption(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && newAssumption.trim()) {
              (editor as any)
                .chain()
                .focus()
                .addAssumption(newAssumption.trim())
                .run();
              setAssumptions([...assumptions, newAssumption.trim()]);
              setNewAssumption('');
            }
          }}
          className="mt-1 w-full border rounded px-1 py-0.5"
        />
      </div>
    </BubbleMenu>
  );
};

export default ConfidenceBubbleMenu; 