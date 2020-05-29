import { Component, ReactNode, ReactElement } from "react";
import React from "react";
import { mapToType } from "helpers/helpers";

interface FormGroupProps {
}

export class FormGroup extends Component<FormGroupProps> {

    removeChildren(key: any, value: any) {
        if (key == "children") return undefined;
        else return value;
    }

    render() {
        const children = mapToType<Array<ReactElement>>(this.props.children);
        const props = JSON.parse(JSON.stringify(this.props, this.removeChildren));

        props.className == undefined
            ? props.className = "form-group"
            : props.className += " form-group";

        const groupElement = React.createElement(
            "div",
            this.props,
            children
        )

        return (
            <>
                {groupElement}
            </>
        );
    }
}
