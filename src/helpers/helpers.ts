/**
 * Map a object to viewmodel.
 *
 * @param {*} object The object that will be mapped to viewmodel
 * @returns mapped object
 */
export function mapToViewModel<T>(object: any): T {
    return object;
}

/**
 * Add zeros in front of digit
 *
 * @param {number} number The number zeroes should be applied on
 * @param {number} length The length of the number.
 * @return {string} number with leading zeroes
 */
export function leadingZero(number: number, length: number): string {
    var s = number + "";
    while (s.length < length) s = "0" + s;
    return s;
}

/**
 * Datetime to readable string
 *
 * @param {boolean} withSeconds true returns time with seconds
 * @return {string} func the target function.
 */
export function dateToReadableString(dateTime: Date, withSeconds: boolean = false): string {
    const date = new Date(dateTime);

    const day = leadingZero(date.getUTCDate(), 2);
    const month = leadingZero(date.getUTCMonth(), 2);
    const year = date.getFullYear();
    const hours = leadingZero(date.getHours(), 2);
    const minutes = leadingZero(date.getMinutes(), 2);

    if (withSeconds) {
        const seconds = leadingZero(date.getSeconds(), 2);
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}
