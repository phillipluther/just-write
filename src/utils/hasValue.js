export default (val) => {
    if (typeof val === 'undefined') {
        return false;
    }

    if (val === null) {
        return false;
    }

    if ((typeof val === 'number') && isNan(val)) {
        return false;
    }

    if ((typeof val === 'string') && (val.replace(/ /g, '') === '')) {
        return false;
    }

    return true;
}
