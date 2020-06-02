import React from "react";

interface ButtonProps {
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, isLoading, ...rest}) => (
    <>
        {isLoading
            ? <button { ...rest} disabled><i className="fas fa-spinner fa-spin"></i></button>
            : <button { ...rest}>{children}</button>
        }
    </>
);
