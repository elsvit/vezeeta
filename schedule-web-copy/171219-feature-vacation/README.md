# schedule-web

## Get started

To setup your project

```#!/bin/bash
git clone https://vezeeta-final.visualstudio.com/Vezeeta.Enterprise/_git/schedule-web
cd schedule-web
git submodule update --init
yarn
yarn start
```

## Create builds

```#!/bin/bash
yarn build:[env]
```

> [env] => staging, prelive, production and testing

This will do:
1. Create a production build
2. Compress the build folder and name it [env].[version].zip

If you add ```yarn build:[env]--version``` it will ask you for the new build version first