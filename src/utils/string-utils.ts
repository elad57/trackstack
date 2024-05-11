const READ_FILE_FORMAT = 'utf-8';

const stringSort = (firstFile: string, secondFile: string): number => firstFile > secondFile ? -1 : 1

const isSemanticVersion = (version: string): boolean => {
    const regex = /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?(?:\.json)?$/;
    return regex.test(version);
}

const isString = (string: string): boolean => {
    return typeof string === 'string';
}

const isTrueAndNotString = (param: string | boolean) : boolean => {
    return !isString(param as string) && (param as boolean);
}

export {
    READ_FILE_FORMAT,
    stringSort,
    isSemanticVersion,
    isString,
    isTrueAndNotString
}