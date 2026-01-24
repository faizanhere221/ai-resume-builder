'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Undo,
  Redo,
  Type,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
}

// Predefined colors
const textColors = [
  { name: 'Default', color: '#1e293b' },
  { name: 'Gray', color: '#64748b' },
  { name: 'Red', color: '#dc2626' },
  { name: 'Orange', color: '#ea580c' },
  { name: 'Green', color: '#16a34a' },
  { name: 'Blue', color: '#2563eb' },
  { name: 'Purple', color: '#9333ea' },
  { name: 'Pink', color: '#db2777' },
]

const highlightColors = [
  { name: 'None', color: '' },
  { name: 'Yellow', color: '#fef08a' },
  { name: 'Green', color: '#bbf7d0' },
  { name: 'Blue', color: '#bfdbfe' },
  { name: 'Purple', color: '#e9d5ff' },
  { name: 'Pink', color: '#fbcfe8' },
  { name: 'Orange', color: '#fed7aa' },
  { name: 'Gray', color: '#e5e7eb' },
]

// Toolbar Button Component
function ToolbarButton({
  onClick,
  isActive,
  disabled,
  tooltip,
  children,
}: {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  tooltip: string
  children: React.ReactNode
}) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClick}
            disabled={disabled}
            className={cn(
              'h-8 w-8 p-0',
              isActive && 'bg-slate-200 text-slate-900'
            )}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Color Picker Component
function ColorPicker({
  colors,
  currentColor,
  onSelect,
  icon: Icon,
  tooltip,
}: {
  colors: { name: string; color: string }[]
  currentColor?: string
  onSelect: (color: string) => void
  icon: React.ElementType
  tooltip: string
}) {
  return (
    <Popover>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Icon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="w-auto p-2 z-[200]" align="start">
        <div className="grid grid-cols-4 gap-1">
          {colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => onSelect(c.color)}
              className={cn(
                'w-6 h-6 rounded border-2 transition-all hover:scale-110',
                currentColor === c.color ? 'border-blue-500' : 'border-transparent',
                !c.color && 'bg-white border-slate-300'
              )}
              style={{ backgroundColor: c.color || undefined }}
              title={c.name}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Toolbar Component
function Toolbar({ editor }: { editor: Editor }) {
  if (!editor) return null

  return (
    <div className="flex items-center gap-0.5 p-1 border-b bg-slate-50 flex-wrap">
      {/* Undo/Redo */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        tooltip="Undo (Ctrl+Z)"
      >
        <Undo className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        tooltip="Redo (Ctrl+Y)"
      >
        <Redo className="h-4 w-4" />
      </ToolbarButton>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      {/* Text Formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        tooltip="Bold (Ctrl+B)"
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        tooltip="Italic (Ctrl+I)"
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
        tooltip="Underline (Ctrl+U)"
      >
        <UnderlineIcon className="h-4 w-4" />
      </ToolbarButton>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        tooltip="Bullet List"
      >
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        tooltip="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      {/* Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
        tooltip="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
        tooltip="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
        tooltip="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </ToolbarButton>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      {/* Colors */}
      <ColorPicker
        colors={textColors}
        currentColor={editor.getAttributes('textStyle').color}
        onSelect={(color) => editor.chain().focus().setColor(color).run()}
        icon={Type}
        tooltip="Text Color"
      />
      <ColorPicker
        colors={highlightColors}
        currentColor={editor.getAttributes('highlight').color}
        onSelect={(color) => {
          if (color) {
            editor.chain().focus().setHighlight({ color }).run()
          } else {
            editor.chain().focus().unsetHighlight().run()
          }
        }}
        icon={Highlighter}
        tooltip="Highlight Color"
      />
    </div>
  )
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start typing...',
  className,
  minHeight = '120px',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        code: false,
        blockquote: false,
        horizontalRule: false,
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['paragraph'],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm max-w-none focus:outline-none p-3',
          'prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0',
          '[&_ul]:list-disc [&_ul]:pl-5',
          '[&_ol]:list-decimal [&_ol]:pl-5'
        ),
        style: `min-height: ${minHeight}`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    immediatelyRender: false,
  })

  // Update content when it changes externally
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  // Show loading state while editor initializes
  if (!editor) {
    return (
      <div 
        className={cn('border rounded-lg bg-white', className)}
        style={{ minHeight }}
      >
        <div className="flex items-center gap-0.5 p-1 border-b bg-slate-50">
          <div className="h-8 w-8 bg-slate-200 rounded animate-pulse" />
          <div className="h-8 w-8 bg-slate-200 rounded animate-pulse" />
          <div className="h-8 w-8 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="p-3 text-slate-400">{placeholder}</div>
      </div>
    )
  }

  return (
    <div className={cn('border rounded-lg bg-white overflow-hidden', className)}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}