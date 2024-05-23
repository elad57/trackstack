import MicroserviceData from '../../modules/microservice-data';
import getGemspecData from './gemspec';
import getPackageJsonData from './package-json';
import getPomXmlData from './pom-xml'

const PACKAGE_JSON: string = 'package.json'
const POM_XML: string = 'pom.xml'
const GEMSPEC: string = 'gemspec'


const microserviceVersionFileToMicroServiceDataMap : Record<string, (pathToVersionFile?: string) => Promise<MicroserviceData>> = {
    [PACKAGE_JSON]: getPackageJsonData,
    [POM_XML]: getPomXmlData,
    [GEMSPEC]: getGemspecData
}

const optionToVersionFileName: Record<string, string> = {
    'npm': PACKAGE_JSON
}

export  { 
    microserviceVersionFileToMicroServiceDataMap,
    optionToVersionFileName
};