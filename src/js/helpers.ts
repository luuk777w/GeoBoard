class Helpers {
    constructor() {
        //
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
        $('#view').on('click', `[data-target="${target}"]`, (event) => func(event));
    }

    /**
     * Add zeros in front of digit
     *
     * @param {number} number The number zeroes should be applied on
     * @param {number} length The length of the number.
     * @return {string} number with leading zeroes
     */
    public static leadingZero(number: number, length: number): string {
        var s = number + "";
        while (s.length < length) s = "0" + s;
        return s;
    }
}

interface Date {
    toReadableString(withSeconds: boolean): string;
}

/**
 * Datetime to readable string
 *
 * @param {boolean} withSeconds true returns time with seconds
 * @return {string} func the target function.
 */
Date.prototype.toReadableString = function (withSeconds: boolean = false): string {

    const day = Helpers.leadingZero(this.getUTCDate(), 2);
    const month = Helpers.leadingZero(this.getUTCMonth(), 2);
    const year = this.getFullYear();
    const hours = Helpers.leadingZero(this.getHours(), 2);
    const minutes = Helpers.leadingZero(this.getMinutes(), 2);

    if (withSeconds) {
        const seconds = Helpers.leadingZero(this.getSeconds(), 2);
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}
