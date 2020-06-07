import { Component, InputHTMLAttributes } from "react";
import React from "react";
import { mapToType } from "helpers/helpers";
import { AlertState } from "store/alert/types";
import { AppState } from "store";
import { connect } from "react-redux";

interface FormInputProps extends InputHTMLAttributes<any> {
    hasError?: boolean;
}

export const FormInput: React.FC<FormInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({ children, hasError, ...rest }) => (
    <>
        {hasError
            ? <input className={`${rest.className} has-error`} {...rest} />
            : <input {...rest} />
        }
    </>
);
