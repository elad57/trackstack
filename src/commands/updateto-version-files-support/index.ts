import MicroserviceData from '../../modules/microservice-data';
import getGemspecData from './gemspec';
import getPackageJsonData from './package-json';
import getPomXmlData from './pom-xml'
import getTrackstackJsonData from './trackstack-json';
import { getTrackstackYamlData } from './trackstack-yaml';

const PACKAGE_JSON: string = 'package.json';
const POM_XML: string = 'pom.xml';
const GEMSPEC: string = 'gemspec';
const TRACKSTACK_JSON: string = 'trackstack.json';
const TRACKSTACK_YAML: string = 'trackstack.yaml';


const microserviceVersionFileToMicroServiceDataMap : Record<string, (pathToVersionFile?: string) => Promise<MicroserviceData>> = {
    [PACKAGE_JSON]: getPackageJsonData,
    [POM_XML]: getPomXmlData,
    [GEMSPEC]: getGemspecData,
    [TRACKSTACK_JSON]: getTrackstackJsonData,
    [TRACKSTACK_YAML]: getTrackstackYamlData
}

const optionToVersionFileName: Record<string, string> = {
    'npm': PACKAGE_JSON
}

export  { 
    microserviceVersionFileToMicroServiceDataMap,
    optionToVersionFileName
};