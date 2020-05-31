import { Component, ReactNode, ReactElement, FormHTMLAttributes } from "react";
import React from "react";
import { mapToType } from "helpers/helpers";

interface FormProps {
}

export class Form extends Component<FormHTMLAttributes<any>> {
    render() {
        const children = mapToType<Array<FormHTMLAttributes<any>>>(this.props.children);
        const props = this.props;

        const formElement = React.createElement(
            "form",
            props,
            children
        )

        return (
            <>
                {formElement}
            </>
        );
    }
}
