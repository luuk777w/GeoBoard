import { Component } from "react";
import React from "react";


interface FormFieldValidationErrorsProps {
    field: string;
    errors: any;
}

export class FormFieldValidationErrors extends Component<FormFieldValidationErrorsProps> {

    render() {
        if (this.props.errors == null || this.props.errors[this.props.field] == null) return (<></>);

        return (
            <>
                {this.props.errors[this.props.field].map((error: string, index: any) => {
                    return (<div key={index} className="validation-error">{error}</div>);
                })}
            </>
        );
    }
}
