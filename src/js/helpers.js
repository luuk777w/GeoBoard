App.Helpers = (function () {

    let configMap = {
    }

    const _init = function () {
        console.log("Helpers");
    }

    const sanitize = function (string) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        return string.replace(reg, (match) => (map[match]));
    }

    const decode = function (string) {
        var parser = new DOMParser;
        var dom = parser.parseFromString(
            '<!doctype html><body>' + string,
            'text/html');
        var decodedString = dom.body.textContent;

        return decodedString;
    }

    /**
     * Toggle the loading state of the button.
     *
     * @param {*} element The button element name.
     * @param {*} show Whether or not the loading state should be shown.
     */
    const toggleLoadingButton = function (element, show = true) {
        if (show) {
            $(element).data('value', $(element).text());

            $(element).prop('disabled', true);
            $(element).html(`<i class="fas fa-spinner fa-spin"></i>`);
        }
        else {
            if ($(element).data('value') != undefined) {
                $(element).html($(element).data('value'));
                $(element).prop('disabled', false);
            }
        }
    }

    return {
        init: _init,
        sanitize,
        decode,
        toggleLoadingButton
    }
})();
