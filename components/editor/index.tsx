import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC } from "react";
import ToolBar from "./ToolBar";

interface Props {}

const Editor: FC<Props> = (props): JSX.Element => {
  const editor = useEditor({ extensions: [StarterKit] });
  return (
    <div>
      <button
        onClick={() => {
          if (!editor) return;
          editor.chain().focus().toggleBold().run();
        }}
      >
        Bold
      </button>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
