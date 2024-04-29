const stringSort = (firstFile: string, secondFile: string): number => firstFile > secondFile ? -1 : 1

const isSemanticVersion = (version: string): boolean => {
    const regex = /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;
    return regex.test(version);
}

export {
    stringSort,
    isSemanticVersion
}