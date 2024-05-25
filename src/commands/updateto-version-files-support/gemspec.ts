import * as fs from 'fs';
import MicroserviceData from "../../modules/microservice-data";
import { READ_FILE_FORMAT } from '../../utils/string-utils';

const extractMicroServiceDataFromGemspecContent =(gemspecContent: string): MicroserviceData => {
    const nameMatch = gemspecContent.match(/spec\.name\s*=\s*['"]([^'"]+)['"]/);
    const versionMatch = gemspecContent.match(/spec\.version\s*=\s*(['"])([^'"]+)\1/);

    if (nameMatch && versionMatch) {
        return {
            name: nameMatch[1],
            version: versionMatch[2],
        };
    }

    throw 'Gemspec file content is unvalid by not having version or name';
}


const getGemspecData = async (pathToGemspec?: string) : Promise<MicroserviceData> => {
    let gemspecFileContent: string;
    try {
        gemspecFileContent = fs.readFileSync(pathToGemspec!, READ_FILE_FORMAT);
    } catch(readGemspecError) {
        throw `cannot read file ${pathToGemspec}`;
    }

    return extractMicroServiceDataFromGemspecContent(gemspecFileContent);
}

export default getGemspecData;