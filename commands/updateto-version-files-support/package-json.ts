import * as fpj from 'find-package-json'
import MicroserviceData from '../../modules/microservice-data'

const getPackageJsonData = async (pathToPackgeJson?: string) : Promise<MicroserviceData> => {
    const { name, version } = fpj(pathToPackgeJson).next().value  as MicroserviceData;
    return { name, version};
}

export default getPackageJsonData