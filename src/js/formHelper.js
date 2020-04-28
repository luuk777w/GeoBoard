App.FormHelper = (function () {

    const _init = function () {
        console.log("FormHelper");

        // Clear the validaton errors.
        clearErrors();
    }

    const showError = function (field, error) {
        const element = $(`.validation-error[data-field="${field.toLowerCase()}"]`);

        element.text(error);
        element.show();
    }

    const clearErrors = function () {
        $('.validation-error').toArray().forEach(element => {
            // Clear the validation error text.
            $(element).text('');

            // Hide the element.
            $(element).hide();
        });

        // Remove the red borders from inputs.
        $('.has-error').toArray().forEach(element => $(element).removeClass('has-error'));
    }

    const highlightField = function (field) {
        $(field).addClass("has-error");
    }

    const getFormData = function (selector) {

        let formData = {
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

    return {
        init: _init,
        getFormData,
        showError,
        clearErrors,
        highlightField
    }
})();
