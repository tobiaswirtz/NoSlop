import { BubbleMenu, Editor } from '@tiptap/react';
import React, { useState } from 'react';

interface Props {
  editor: Editor | null;
}

const ConfidenceBubbleMenu: React.FC<Props> = ({ editor }) => {
  const [value, setValue] = useState(100);

  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 150, placement: 'top' }}
      className="bg-white border shadow rounded px-3 py-2 flex items-center gap-2"
    >
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={e => setValue(parseInt(e.target.value, 10))}
        className="w-32"
      />
      <span className="text-sm w-10 text-right">{value}%</span>
      <button
        onClick={() => (editor as any).chain().focus().setConfidence(value).run()}
        className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
      >
        Apply
      </button>
    </BubbleMenu>
  );
};

export default ConfidenceBubbleMenu; 