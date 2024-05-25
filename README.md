# trackstack
trackstack is a command line tool that allows you to easily track code changes in your project.

## Installation
to install trackstack globaly, run `npm install -g trackstack`

## Usage

trackstack is a cli tool that allows you to easily track code changes in your project.

### trackstack init
initializes a new project by creating a new directory.

example:
```
trackstack init my-project
```

### trackstack updateto
Write to next version new microservice version. needs a project path. Versions need to be in semantic version format! 

version files support:
package.json
pom.xml
.gemspec

examples:
```
// uses by defualt package.json of this project

trackstack updateto path/my-project

// specify version control project

trackstack updateto -p path/to/microservice/pom.xml path/my-project
```

### trackstack release
Release new project version. New version needs to be semantic version format!

example:
```
trackstack release path/my-project 1.0.0
```

### trackstack getVersions
Gets all the previous versions of project.

example:
```
trackstack getVersions path/my-project
```

### trackstack details
Details of the project version.

examples:
```
// all details
trackstack details path/my-project 1.0.0

// just the current microservices
trackstack details -a path/my-project 1.0.0

// just changes
trackstack details -c path/my-project 1.0.0
```

### trackstack status
Prints status of new microservice versions that will be updated in new release/

example:
```
trackstack status path/my-project
```