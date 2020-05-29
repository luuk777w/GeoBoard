import { Component, ReactNode, ReactElement, HTMLAttributes } from "react";
import React from "react";
import { mapToType } from "helpers/helpers";

interface FormPanelProps {

}

export class FormPanel extends Component<HTMLAttributes<any>> {

    removeChildren(key: any, value: any) {
        if (key == "children") return undefined;
        else return value;
    }

    render() {
        const children = mapToType<Array<HTMLAttributes<any>>>(this.props.children);
        const props = JSON.parse(JSON.stringify(this.props, this.removeChildren));

        props.className == undefined
            ? props.className = "form-panel"
            : props.className += " form-panel";

        const panelElement = React.createElement(
            "div",
            props,
            children
        )

        return (
            <>
                {panelElement}
            </>
        );
    }
}
