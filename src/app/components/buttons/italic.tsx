import React from "react";
import {Editor} from "@tiptap/react";
import Image from "next/image";

interface ButtonProps {
    svgLink: string;
    buttonType: string;
    className: string;
    clickEvent: () => void;
    editor: Editor;
}

const Button = ({svgLink, buttonType, className, clickEvent, editor}: ButtonProps) => {
    return (
        <button
            onClick={clickEvent}
            className={editor.isActive(buttonType) ? 'style-btn-active' + className : className}
        >
            <Image width={15} height={15} src={svgLink} alt={className}></Image>
        </button>
    )
}

export default Button;