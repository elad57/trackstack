import * as fs from 'fs';
import * as xml2js from 'xml2js'
import MicroserviceData from '../../modules/microservice-data';
import {READ_FILE_FORMAT} from '../../utils/string-utils'

const getPomXmlData = async (pathToPomXml: string = './pom.xml'): Promise<MicroserviceData> => {
    let pomXml: string;
    
    try {
        pomXml = fs.readFileSync(pathToPomXml, READ_FILE_FORMAT)
    } catch(errorReadingFile) {
        throw `cannot read file ${pathToPomXml}`
    }

    const { project } : {project: Record<string, unknown>} =await xml2js.parseStringPromise(pomXml);

    const { version: versionArray, artifactId } = project as { version: [string], artifactId: [string] };
    const [name] = artifactId;
    const [version] = versionArray


    return {
        version,
        name
    }
}

export default getPomXmlData 