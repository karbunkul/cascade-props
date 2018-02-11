const cascadeProps = require('./index')

const props = {
  app: {
    name: {
      any: 'Herbalife',
      dev: { value: 'Herbalife dev title' },
      ios: 'Herbalife iOS',
      dark: 'Herbalife Theme Dark'
    },
    port: {
      any: 9090,
      dev: 3030,
      prod: 80
    }
  }
}

const variants = [{ platform: 'ios' }, { env: 'dev' }]
const cp = cascadeProps({props, variants})
cp.variant('theme', 'dark')

console.log(cp.node('app.port', ['env']))
console.log('node', cp.node('app.name', ['platform', 'env']))
