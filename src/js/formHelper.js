App.FormHelper = (function () {

    const _init = function () {
        console.log("FormHelper");
    }

    const showError = function (error) {
        $(".validation-error").html(error);
    }

    const highlightField = function (field) {
        $(field).addClass("field-error-border");
    }

    const getFormData = function (selector) {

        let formData = {
            formCompleted: true,
            notCompletedFields: [],
            fields: {}
        };

        $(selector).find("input").toArray().forEach(input => {
            if ($(input).is(`[type="checkbox"]`)) {
                formData.fields[input.id] = input.checked;
            } else {
                formData.fields[input.id] = input.value;

                if (input.value == "") {
                    formData.notCompletedFields.push(input.id);
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
        highlightField
    }
})();
