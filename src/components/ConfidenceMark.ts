import { Mark } from '@tiptap/core';

export interface ConfidenceAttributes {
  value: number;
  assumptions: string[];
  uid: string | null;
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
          const weight = 100 + val * 3; // 100 to 400 (normal)
          return {
            'data-confidence': val,
            style: `opacity:${opacity}; font-weight:${weight};`
          };
        }
      },
      assumptions: {
        default: [],
        parseHTML: (el: HTMLElement) => {
          const attr = el.getAttribute('data-assumptions');
          return attr ? attr.split('|').filter(Boolean) : [];
        },
        renderHTML: (attrs: { assumptions: string[] }) => {
          const list = attrs.assumptions ?? [];
          return {
            'data-assumptions': list.join('|')
          };
        }
      },
      uid: {
        default: null,
        parseHTML: (el: HTMLElement) => el.getAttribute('data-uid'),
        renderHTML: (attrs: { uid: string }) => ({ 'data-uid': attrs.uid })
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
    const genUid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

    return {
      setConfidence:
        (value: number) => ({ editor, commands }: { editor: any; commands: any }) => {
          const attrs: any = editor.getAttributes(this.name) || {};
          const assumptions = Array.isArray(attrs.assumptions) ? attrs.assumptions : [];
          return commands.setMark(this.name, {
            value,
            assumptions,
            uid: genUid()
          });
        },

      addAssumption:
        (assumption: string) => ({ editor, commands }: { editor: any; commands: any }) => {
          const attrs: any = editor.getAttributes(this.name) || {};
          const value = attrs.value ?? 100;
          const list: string[] = Array.isArray(attrs.assumptions) ? attrs.assumptions : [];
          return commands.setMark(this.name, {
            value,
            assumptions: [...list, assumption],
            uid: genUid()
          });
        },

      removeAssumption:
        (index: number) => ({ editor, commands }: { editor: any; commands: any }) => {
          const attrs: any = editor.getAttributes(this.name) || {};
          const value = attrs.value ?? 100;
          const list: string[] = Array.isArray(attrs.assumptions) ? attrs.assumptions : [];
          return commands.setMark(this.name, {
            value,
            assumptions: list.filter((_, i) => i !== index),
            uid: genUid()
          });
        }
    } as any;
  }
}); 