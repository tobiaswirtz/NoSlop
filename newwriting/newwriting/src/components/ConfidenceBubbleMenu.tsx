import { BubbleMenu, Editor } from '@tiptap/react';
import React, { useState } from 'react';

interface Props {
  editor: Editor | null;
}

const ConfidenceBubbleMenu: React.FC<Props> = ({ editor }) => {
  const [value, setValue] = useState<number>(100);

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
        onChange={e => {
          const val = parseInt(e.target.value, 10);
          setValue(val);
          (editor as any).chain().focus().setConfidence(val).run();
        }}
        className="w-32"
      />
      <span className="text-sm w-10 text-right">{value}%</span>
    </BubbleMenu>
  );
};

export default ConfidenceBubbleMenu; 