class FormHelper {

    constructor() {
        console.log("FormHelper");

        // Clear the validaton errors.
        this.clearErrors();
    }

    public showError = function (field: string, errors: any) {
        const element = $(`.validation-error[data-field="${field.toLowerCase()}"]`);

        if (!(errors instanceof Array) || errors.length == 1) {
            element.text(errors);
        }
        else {
            const errorList = '<ul/>';

            for (let error in errors) {
                $('<li/>')
                    .text(errors[error])
                    .appendTo(errorList);
            }

            element.html(errorList);
        }

        element.show();
    }

    public clearErrors() {
        $('.validation-error').toArray().forEach(element => {
            // Clear the validation error text.
            $(element).text('');

            // Hide the element.
            $(element).hide();
        });

        // Remove the red borders from inputs.
        $('.has-error').toArray().forEach(element => $(element).removeClass('has-error'));
    }

    public highlightField(field) {
        $(field).addClass("has-error");
    }

    public getFormData(selector): formData<any> {

        let formData: formData<any> = {
            formCompleted: true,
            notCompletedFields: [],
            fields: {}
        };

        $(selector).find("input").toArray().forEach(input => {
            if ($(input).is(`[type="checkbox"]`)) {
                formData.fields[input.name] = input.checked;
            } else {
                formData.fields[input.name] = input.value;

                if (input.value == "") {
                    formData.notCompletedFields.push(input.name);
                }
            }
        });

        if (formData.notCompletedFields.length > 0) {
            formData.formCompleted = false;
        }

        return formData;
    }

}

interface formData<T> {
    formCompleted: boolean,
    notCompletedFields: Array<string>,
    fields: T
}
