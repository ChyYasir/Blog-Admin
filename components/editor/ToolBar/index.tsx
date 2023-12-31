import { Editor } from "@tiptap/react";
import { FC } from "react";
import DropdownOptions from "../../common/DropdownOptions";

interface Props {
  editor: Editor | null;
}

const ToolBar: FC<Props> = ({ editor }): JSX.Element | null => {
  if (!editor) return null;

  const options = [
    {
      label: "Paragraph",
      onClick: () => console.log("paragraph"),
    },
    {
      label: "Heading 1",
      onClick: () => console.log("heading 1"),
    },
    {
      label: "Heading 2",
      onClick: () => console.log("heading 2"),
    },
    {
      label: "Heading 3",
      onClick: () => console.log("heading 3"),
    },
  ];
  return (
    <div>
      <DropdownOptions options={options} head={<p>Paragraph</p>} />
    </div>
  );
};

export default ToolBar;
