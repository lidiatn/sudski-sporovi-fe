import {type MouseEventHandler, type ReactNode} from "react";

interface SubmitButtonProps{
  onClick: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}

const SubmitButton = ({ onClick, children }:SubmitButtonProps) => (
    <button
        className="green-500 bg-green-800 hover:bg-green-400
                text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
    >
      {children}
    </button>
);

export default SubmitButton;