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
          const opacity = 0.2 + (val / 100) * 0.8; // 0.2–1 range
          const weight = 100 + val * 3; // 100 (hairline) to 400 (normal)
          return {
            'data-confidence': val,
            style: `opacity:${opacity}; font-weight:${weight};`
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
    } as any;
  }
}); 