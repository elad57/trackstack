import MicroserviceData from '../../modules/microservice-data';
import getPackageJsonData from './package-json';
import getPomXmlData from './pom-xml'

const PACKAGE_JSON: string = 'package.json'
const POM_XML: string = 'pom.xml'


const microserviceVersionFileToMicroServiceDataMap : Record<string, (pathToVersionFile?: string) => Promise<MicroserviceData>> = {
    [PACKAGE_JSON]: getPackageJsonData,
    [POM_XML]: getPomXmlData
}

const optionToVersionFileName: Record<string, string> = {
    'npm': PACKAGE_JSON
}

export  { 
    microserviceVersionFileToMicroServiceDataMap,
    optionToVersionFileName
};