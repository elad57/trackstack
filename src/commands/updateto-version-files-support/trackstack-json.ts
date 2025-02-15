import * as fs from 'fs';

import MicroserviceData from "../../modules/microservice-data";
import { READ_FILE_FORMAT } from '../../utils/string-utils';

const getTrackstackJsonData = async (pathToTrackStackJson: string = './trackstack.json') : Promise<MicroserviceData> => {
    let trackstackJson: string;

    try {
        trackstackJson = fs.readFileSync(pathToTrackStackJson, READ_FILE_FORMAT)
    } catch(errorReadingFile) {
        throw `cannot read file ${pathToTrackStackJson}`;
    }
    
    let microserviceData: MicroserviceData;
    
    try {
        microserviceData = JSON.parse(trackstackJson);
    } catch(errorJsonParse) {
        throw `cannot parse file ${pathToTrackStackJson};`
    }

    return microserviceData;
}

export default getTrackstackJsonData