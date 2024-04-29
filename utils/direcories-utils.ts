import * as fs from 'fs';
import { isSemanticVersion, stringSort } from './string-utils'

const getProjectPreviousVersionsByOrder = (projectPath: string): string[] => {    
    const projectFiles = fs.readdirSync(projectPath);
    const versionFiles = projectFiles.filter(isSemanticVersion)

    return versionFiles.sort(stringSort);
};


export {
    getProjectPreviousVersionsByOrder
}