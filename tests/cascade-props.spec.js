const chai = require('chai')
const expect = chai.expect
const cascadeProps = require('../index')

const props = {
  app: {
    port: {
      any: 9090,
      dev: 3030,
      prod: 80
    }
  },
  theme: {
    logo: {
      any: {
        height: 42,
        textAlign: 'center'
      },
      main: {
        any: {
          fontSize: 36
        },
        ios: {
          fontWeight: 'bold'
        }
      }
    }
  }
}

const cp = cascadeProps({props})

describe('CascadeProps module test', () => {
  it('should return import function', () => {
    expect(cascadeProps instanceof Function).to.equal(true)
  })
  describe('should return right values', () => {
    it('single value without variants', () => {
      expect(cp.node('app.port').value).to.equal(9090)
    })

    it('set new variant env=dev', () => {
      cp.variant('env', 'dev')
      expect(cp.node('app.port', ['env']).value).to.equal(3030)
    })

    it('change variant value env=prod', () => {
      cp.variant('env', 'prod')
      expect(cp.node('app.port', ['env']).value).to.equal(80)
    })

    it('remove variant', () => {
      cp.remove('env')
      expect(cp.node('app.port').value).to.equal(9090)
    })

    it('get multi-props', () => {
      const mainLogo = cp.node('theme.logo.main')
      expect(mainLogo.hasOwnProperty('height')).to.equal(true)
      expect(mainLogo['height']).to.equal(42)
      expect(mainLogo.hasOwnProperty('textAlign')).to.equal(true)
      expect(mainLogo['textAlign']).to.equal('center')
      expect(mainLogo.hasOwnProperty('fontSize')).to.equal(true)
      expect(mainLogo['fontSize']).to.equal(36)
    })

    it('get multi-props for ios', () => {
      cp.variant('platform', 'ios')
      const mainLogoIos = cp.node('theme.logo.main', ['platform'])
      expect(mainLogoIos.hasOwnProperty('height')).to.equal(true)
      expect(mainLogoIos['height']).to.equal(42)
      expect(mainLogoIos.hasOwnProperty('textAlign')).to.equal(true)
      expect(mainLogoIos['textAlign']).to.equal('center')
      expect(mainLogoIos.hasOwnProperty('fontSize')).to.equal(true)
      expect(mainLogoIos['fontSize']).to.equal(36)
      expect(mainLogoIos.hasOwnProperty('fontWeight')).to.equal(true)
      expect(mainLogoIos['fontWeight']).to.equal('bold')
    })
  })
})
