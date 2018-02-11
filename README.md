# Cascade Props

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Synopsis](#synopsis)
- [How to use](#how-to-use)
- [API reference](#api-reference)
	- [node](#node)
	- [variant](#variant)

<!-- /TOC -->

## Synopsis
Helper for merging props use different variants

## How to use

```bash
npm install cascade-props --save
```

```js
const cascadeProps = require('cascade-props')
// example props
const props = {
  app:{
    port: {
      dev: 3030,
      prod: 80,
    }
  }
}
// setup default variants
const variants = [{env: 'prod'}]
// create instance of CascadeProps
const cp = cascadeProps({props, variants})
// get props by env variant ('prod')
const port = cp.node('app.port') // 80 if env=prod and 3030 if env=dev
```

## API reference

### node
Get props by path (xpath syntax) (for example 'app.port')

### variant
Set new variant or change existed variant value

© Alexander Pokhodyun (Karbunkul) 2018
