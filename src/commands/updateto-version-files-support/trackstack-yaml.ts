import readYamlFile from 'read-yaml-file'

import MicroserviceData from "../../modules/microservice-data";

const getTrackstackYamlData = async (pathToTrackStackYaml: string = './trackstack.yaml') : Promise<MicroserviceData> => {
   try {
       return await readYamlFile(pathToTrackStackYaml);

   } catch(readingYamlError) {
    throw new Error(`Failed reading yaml file at path ${pathToTrackStackYaml}`)
   }

}

export {
    getTrackstackYamlData
}