const CascadeProps = require('./index')

const config = {
  app: {
    name: {
      any: 'Herbalife',
      dark: ['Herbalife Dark'],
      ios: 'Herbalife iOS',
    }
  }
}

const variants = [{'platform': 'ios'}, {'env': 'dev'}]
const cp = new CascadeProps(config, variants)
cp.variant('theme', 'dark')

console.log('node', cp.node('app.name'))
