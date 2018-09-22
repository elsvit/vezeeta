# Vezeeta Utils

## Get started

To setup your project

```#!/bin/bash
git clone https://vezeeta-final.visualstudio.com/Vezeeta.Enterprise/_git/vezeeta-utils
cd vezeeta-utils
yarn
yarn start
```

## Pushing a new version

To push a new version to myget.org you have to set registry into your npm. This will create a new scope called vezeeta which
will be used to get packages from myget.org any other package without @vezeeta scope will be installed from the default npm registry

```#!/bin/bash
npm config set @vezeeta:registry=https://www.myget.org/F/vezeeta/npm/
npm login --registry https://www.myget.org/F/vezeeta/npm/ --scope=@vezeeta
npm config set always-auth true --registry https://www.myget.org/F/vezeeta/npm/
```

To use this package in any project

```#!/bin/bash
yarn add @vezeeta/vezeeta-utils
```

Once you finished developing and want to push to the myget registry

```#!/bin/bash
yarn build
```

This will do:

1. Ask you for the new version
2. Create a new tag with the new version then push it to the origin
3. Create a production build
4. Push the build to myget.org

## Contributing

To contribute in this project, make sure to add documentation to components you added/changed in COMPONENTS.md