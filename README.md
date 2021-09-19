# Visual Studio Code debug profiles
Common debug configurations for Node.js for reference.

These profiles utilise the npm scripts in `package.json` and the Docker Compose files to help orchestrate debugging.

## Profiles
All profiles are defined in [.vscode/launch.json](.vscode/launch.json)

### Node: Launch
Start Node application with debugger attached for server and client side code.  Once the console logs the server is running, a Chrome debugging window will open.

If no client side code, the `serverReadyAction` can be omitted.

```
{
  "name": "Node: Launch",
  "program": "${workspaceFolder}/app",
  "request": "launch",
  "skipFiles": [
    "<node_internals>/**"
  ],
  "type": "pwa-node",
  "serverReadyAction": {
    "pattern": "Server running on",
    "uriFormat": "http://localhost:3000",
    "action": "debugWithChrome"
  }
}
```

### Node: Server
Start Node application with debugger attached for server code.

```
{
  "name": "Node: Server",
  "program": "${workspaceFolder}/app",
  "request": "launch",
  "skipFiles": [
    "<node_internals>/**"
  ],
  "type": "pwa-node"
}
```

### Node: Client
Start Node application with debugger attached for client side code only with Chrome.

**Note:** this depends on the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension.

```
{
  "name": "Node: Client",
  "type": "pwa-chrome",
  "request": "launch",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}"
}
```

### Node: Client/Server
This is a compound profile that will simultaneously run profiles `Node: Server` and `Node: Client`.

```
{
  "name": "Node: Client/Server",
  "configurations": [
    "Node: Server",
    "Node: Client"
  ]
}
```

### Node: Jest
Run all Jest tests with debugger attached.

```
{
  "name": "Node: Jest",
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": [
    "--runInBand"
  ],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "disableOptimisticBPs": true,
  "windows": {
    "program": "${workspaceFolder}/node_modules/jest/bin/jest",
  }
}
```

### Node: Jest Current File
Run Jest tests in current open file with debugger attached.

```
{
  "name": "Node: Jest Current File",
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": [
    "${fileBasenameNoExtension}",
    "--config",
    "jest.config.js"
  ],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "disableOptimisticBPs": true,
  "windows": {
    "program": "${workspaceFolder}/node_modules/jest/bin/jest",
  }
}
```

### Docker: Attach
Attach debugger to running Docker container.  By default it will use port `9229`, but this can be configured with the `port` property.

```
{
  "name": "Docker: Attach",
  "type": "node",
  "request": "attach",
  "remoteRoot": "/home/node",
  "skipFiles": [
    "<node_internals>/**"
  ]
}
```

### Docker: Attach Launch
Start application in a container using Docker Compose and attach debugger.  By default it will use port `9229`, but this can be configured with the `port` property.

**Note:** this depends on tasks defined in [.vscode/tasks.json](.vscode/tasks.json)

```
  {
    "name": "Docker: Attach Launch",
    "type": "node",
    "request": "attach",
    "remoteRoot": "/home/node",
    "skipFiles": [
      "<node_internals>/**"
    ],
    "preLaunchTask": "compose-debug-up",
    "postDebugTask": "compose-debug-down"
  }
```

#### Tasks

```
{
  "label": "compose-debug-up",
  "type": "shell",
  "command": "docker-compose -f docker-compose.yaml -f docker-compose.override.yaml -f docker-compose.debug.yaml up -d"
},
{
  "label": "compose-debug-down",
  "type": "shell",
  "command": "docker-compose -f docker-compose.yaml -f docker-compose.override.yaml -f docker-compose.debug.yaml down"
}
```

### Docker: Jest Attach
Attach debugger to running Docker container running Jest tests.  By default it will use port `9229`, but this can be configured with the `port` property.

```
{
  "name": "Docker: Jest Attach",
  "type": "node",
  "request": "attach",
  "port": 9229,
  "trace": true,
  "restart": true,
  "timeout": 10000,
  "remoteRoot": "/home/node",
  "disableOptimisticBPs": true,
  "internalConsoleOptions": "neverOpen",
  "continueOnAttach": true,
  "skipFiles": [
    "<node_internals>/**",
    "**/node_modules/**"
  ]
}
```

### Docker: Jest Attach Launch
Run all Jest tests with debugger attached in a Docker container.

**Note:** this depends on tasks defined in [.vscode/tasks.json](.vscode/tasks.json)

```
{
  "name": "Docker: Jest Attach Launch",
  "type": "node",
  "request": "attach",
  "remoteRoot": "/home/node",
  "skipFiles": [
    "<node_internals>/**"
  ],
  "preLaunchTask": "compose-test-debug-up",
  "postDebugTask": "compose-test-debug-down"
}
```

#### Tasks

```
{
  "label": "compose-test-debug-up",
  "type": "shell",
  "command": "docker-compose -f docker-compose.yaml -f docker-compose.test.yaml -f docker-compose.test.debug.yaml up -d"
},
{
  "label": "compose-test-debug-down",
  "type": "shell",
  "command": "docker-compose -f docker-compose.yaml -f docker-compose.test.yaml -f docker-compose.test.debug.yaml down"
}
```
