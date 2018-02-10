const colors = require('colors/safe');


// namespaces and fancifies console.log output for the module. takes a message
// and decorators param; decorators can be a string ('blue', eg.) or an array of
// options from the colors module (['blue', 'bold'])
module.exports = (message, decorators='white') => {
    let namespace = colors.gray('[just-write]');
    let colorChain, outputString;
    let useConsoleOut = process.env.NODE_ENV !== 'test';

    // if the given message is an object, we assume it's a thrown error and not
    // an explicit log
    if (typeof message !== 'string') {
        if (useConsoleOut) {
            /* eslint-disable */
            console.log(`${namespace} ${colors.red.bold('ERROR')}`);
            console.log(message);
            /* eslint-enable */
        }

        return message.toString();
    }

    if (typeof decorators === 'string') {
        colorChain = colors[decorators];

    // chain the given decorators
    } else {
        colorChain = colors;
        decorators.forEach(decorator => {
            colorChain = colorChain[decorator];
        });
    }

    // TODO any additional logging?

    outputString = namespace + ' ' + colorChain(message);

    if (useConsoleOut) {
        console.log(outputString); // eslint-disable-line
    }

    return outputString;
};
