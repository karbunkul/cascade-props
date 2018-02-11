const cascadeVariants = {}

class CascadeProps {
  constructor ({props, variants, options}) {
    this.props = props
    if (variants && variants.length > 0) {
      variants.forEach((variant) => {
        try {
          if (variant instanceof Object) {
            const key = Object.keys(variant)[0]
            const value = variant[key]
            this.variant(key, value)
          }
        } catch (err) {
          console.warn(err)
        }
      })
    }
  }

  variant (key, value) {
    if (key && value && key !== '' && value !== '') {
      cascadeVariants[key] = value
    }
  }

  remove (key) {
    if (cascadeVariants.hasOwnProperty(key)) {
      delete cascadeVariants[key]
    } else {
      console.warn(`Invalid variant ${key}. Has not remove variant.`)
    }
  }

  prop (prop, orders) {
    let props = {}
    if (prop) {
      orders.forEach((order) => {
        let propObj = prop[order] || {}
        props = {
          ...props,
          ...propObj
        }
      })
      return props
    }
    return {}
  }

  node (path, variants = []) {
    const paths = path.split('.')
    const props = this.findNextNode(paths)
    const orders = ['any']
    variants.forEach((variant) => {
      if (cascadeVariants.hasOwnProperty(variant)) {
        orders.push(cascadeVariants[variant])
      } else {
        console.warn(`Invalid variant ${variant}.`)
      }
    })

    let propsObj = {}
    props.forEach(({prop, value}) => {
      propsObj = {...propsObj, ...this.prop(value, orders)}
    })
    return propsObj
  }

  findNextNode (paths, props = [], root) {
    const prop = paths.shift()
    if (!root) {
      root = this.props
    }
    if (root.hasOwnProperty(prop)) {
      const rootObj = root[prop]
      let valueObj = {}
      const {any = {}} = rootObj
      if (!(any instanceof Object) || (any instanceof Array)) {
        valueObj['any'] = {value: any}
      } else {
        valueObj['any'] = any
      }
      for (let variant in cascadeVariants) {
        let variantKey = cascadeVariants[variant]
        let variantValue = rootObj[variantKey] || {}
        if (!(variantValue instanceof Object) || (variantValue instanceof Array)) {
          valueObj[variantKey] = {value: variantValue}
        } else {
          valueObj[variantKey] = variantValue
        }
      }
      props.push({prop, value: valueObj})
      root = rootObj
    } else {
      return props
    }
    if (paths.length !== 0) {
      return this.findNextNode(paths, props, root)
    } else {
      return props
    }
  }
}

module.exports = ({props, variants = [], options = {}}) => {
  return new CascadeProps({props, variants, options})
}
