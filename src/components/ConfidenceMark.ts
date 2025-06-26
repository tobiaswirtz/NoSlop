import { Mark } from '@tiptap/core';

export interface ConfidenceAttributes {
  value: number;
}

export const ConfidenceMark = Mark.create({
  name: 'confidence',

  addAttributes() {
    return {
      value: {
        default: 100,
        parseHTML: (element: HTMLElement) => {
          const attr = element.getAttribute('data-confidence');
          return attr ? parseInt(attr, 10) : 100;
        },
        renderHTML: (attributes: { value: number }) => {
          const val = attributes.value ?? 100;
          return {
            'data-confidence': val,
            style: `opacity:${val / 100}; font-weight:${200 + val * 5};`
          };
        }
      }
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-confidence]' }];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
    return ['span', HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setConfidence:
        (value: number) => ({ commands }: { commands: any }) =>
          commands.setMark(this.name, { value })
    };
  }
}); 