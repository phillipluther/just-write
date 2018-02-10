export default (str) => {
    let firstChar = str.charAt(0).toLowerCase();
    let theRest = str.substr(1, str.length);

    theRest = theRest
        .replace(/\-/g, '')
        .replace(/\_/g, '')
        .replace(/ /g, '');

    return firstChar + theRest;
}
