import * as fpj from 'find-package-json'
import MicroserviceData from '../../modules/microservice-data'

const getPackageJsonData = (pathToPackgeJson?: string) : MicroserviceData => {
    const { name, version } = fpj(pathToPackgeJson).next().value  as MicroserviceData;
    return { name, version};
}

export default getPackageJsonData