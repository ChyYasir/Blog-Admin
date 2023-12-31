import { FC } from "react";
import Editor from "../../../components/editor";

interface Props {}

const create: FC<Props> = (props): JSX.Element => {
  return (
    <div className="max-w-4xl mx-auto">
      <Editor />
    </div>
  );
};

export default create;
