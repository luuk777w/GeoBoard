class Helpers {
    constructor() {
        console.log("Helpers");
    }

    public static sanitize(string: string) {
        const map: any = {
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

    public static decode(string: string) {
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
    public static toggleLoadingButton(element: string, show: boolean = true) {
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

    /**
     * Register onclick.
     *
     * @param {string} target The datatarget (`[data-target=""]`) of the element the onclick is on.
     * @param {Function} func the target function.
     */
    public static registerOnClick(target: string, func: Function) {
        $('#view').on('click', `[data-target="${target}"]`, () => func());
    }
}
