import MicroserviceData from '../../modules/microservice-data';
import getPackageJsonData from './package-json';

const PACKAGE_JSON = 'package.json'


const microserviceVersionFileToMicroServiceDataMap : Record<string, (pathToVersionFile?: string) => MicroserviceData> = {
    [PACKAGE_JSON]: getPackageJsonData
}

const optionToVersionFileName: Record<string, string> = {
    'npm': PACKAGE_JSON
}

export  { 
    microserviceVersionFileToMicroServiceDataMap,
    optionToVersionFileName
};