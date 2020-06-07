import { Component, InputHTMLAttributes } from "react";
import React from "react";
import { mapToType } from "helpers/helpers";
import { AlertState } from "store/alert/types";
import { AppState } from "store";
import { connect } from "react-redux";

interface FormInputProps extends InputHTMLAttributes<any> {
    alert: AlertState;
}

export const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ children, ...rest }) => (
    <input {...rest} />
);

// class FormInput extends Component<FormInputProps> {

//     removeProps(key: any, value: any) {
//         if (key == "children") return undefined;
//         else if (key == "alert") return undefined;
//         else return value;
//     }

//     render() {
//         const children = mapToType<Array<InputHTMLAttributes<any>>>(this.props.children);
//         const props = JSON.parse(JSON.stringify(this.props, this.removeProps));

//         //====

//         if (this.props.alert.show) {
//             props.className += " has-error";
//         }

//         //====

//         // TODO: Klasse ombouwen naar zoals Button
//         props.onChange = this.props.onChange;

//         const inputElement = React.createElement(
//             "input",
//             props,
//             children
//         )

//         return (
//             <>
//                 {inputElement}
//             </>
//         );

//     }
// }

// const mapStateToProps = (state: AppState) => ({
//     alert: state.alert,
// })

// export default connect(mapStateToProps, {})(FormInput);

