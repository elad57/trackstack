export default interface ProjectVersionData {
    projectVersion: string,
    changes: Record<string, string>,
    allMicroservices: Record<string, string>,
    previousVersions: string[],
    publishTimestamp: string
}