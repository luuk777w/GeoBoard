import { Component, ReactNode, ReactElement, LabelHTMLAttributes } from "react";
import React from "react";
import { mapToType } from "helpers/helpers";

interface FormLabelProps {

}

export class FormLabel extends Component<LabelHTMLAttributes<any>> {
    render() {
        const children = mapToType<Array<LabelHTMLAttributes<any>>>(this.props.children);
        const props = mapToType<Array<LabelHTMLAttributes<any>>>(this.props);

        const labelElement = React.createElement(
            "label",
            props,
            children
        )

        return (
            <>
                {labelElement}
            </>
        );
    }
}
