# trackstack

trackstack is a command line tool that allows you to easily track code changes and manage microservice versions in your project.

---

## Installation

To install trackstack globally, run:

```
npm install -g trackstack
```

---

## Overview

trackstack helps you:
- Initialize a project for version tracking
- Update microservice versions
- Release new project versions
- View project version history and details
- Check the status of microservice versions

---

## Commands & Usage

### 1. `trackstack init <project>`

Initializes a new project directory for version tracking.

**Options:**
- `-p <path>`: Specify the path where the project folder should be created (default: current directory)

**Example:**
```
trackstack init my-project
trackstack init -p ./projects my-project
```

---

### 2. `trackstack updateto <project>`

Writes a new microservice version to the project. Supports multiple version file formats.

**Options:**
- `-p <path>`: Path to the microservice version file (e.g., `package.json`, `pom.xml`, `.gemspec`)
- `-d <path>`: Path to the project directory
- `-npm`: Search only for `package.json`
- `-mvn`: Search only for `pom.xml`
- `-gem`: Search only for `.gemspec`

**Examples:**
```
// Uses package.json by default in the current directory
trackstack updateto path/my-project

// Specify a particular version file
trackstack updateto -p path/to/microservice/pom.xml path/my-project

// Specify the project directory
trackstack updateto -d ./projects/my-project
```

---

### 3. `trackstack release <project-path> <version>`

Releases a new project version. The version must follow semantic versioning.

**Example:**
```
trackstack release path/my-project 1.0.0
```

---

### 4. `trackstack getVersions <project-path>`

Displays all previous versions of the project.

**Example:**
```
trackstack getVersions path/my-project
```

---

### 5. `trackstack details <project-path> <version>`

Shows details for a specific project version.

**Options:**
- `-c`: Show only changes in this version
- `-a`: Show all microservices for this version

**Examples:**
```
// Show all details
trackstack details path/my-project 1.0.0

// Show only the current microservices
trackstack details -a path/my-project 1.0.0

// Show only changes in this version
trackstack details -c path/my-project 1.0.0
```

---

### 6. `trackstack status <project-path>`

Prints the status of new microservice versions that will be updated in the next release.

**Example:**
```
trackstack status path/my-project
```

---

## Typical Workflow

1. **Initialize your project:**
   ```
   trackstack init my-project
   ```

2. **Add or update microservice versions:**
   ```
   trackstack updateto -p ./services/service-a/package.json my-project
   ```

3. **Check the status before releasing:**
   ```
   trackstack status my-project
   ```

4. **Release a new project version:**
   ```
   trackstack release my-project 1.0.0
   ```

5. **View version history and details:**
   ```
   trackstack getVersions my-project
   trackstack details my-project 1.0.0
   ```

---

## Supported Version Files

- `package.json` (Node.js)
- `pom.xml` (Maven/Java)
- `.gemspec` (RubyGems)

---

## License

MIT

---

For more information, see the command help:
```
trackstack --help
```