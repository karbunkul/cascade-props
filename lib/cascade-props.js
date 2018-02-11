const cascadeVariants = {}

class CascadeProps {
  constructor (props, variants = []) {
    this.props = props
    if (variants && variants.length > 0) {
      variants.forEach((variant) => {
        try {
          if (typeof variant) {
            const key = Object.keys(variant)[0]
            const value = variant[key]
            this.variant(key, value)
          }
        } catch (err) {
          console.warn(err)
        }
      })
    }
    // console.log('cascadeVariants', cascadeVariants);
  }
  /**
   * Add variant or change variant value
   *
   * @param  {[string]} variant [description]
   * @param  {[string]} value   [description]
   * @return {[type]}         [description]
   */
  variant (key, value) {
    if (key && value && key !== '' && value !== '') {
      cascadeVariants[key] = value
    }
  }
  /**
   * [prop description]
   * @param  {[type]} prop [description]
   * @return {[type]}      [description]
   */
  prop (prop, variants) {
    let props = {}
    if (prop) {
      for(let propName in prop) {
        let propObj = prop[propName] || {}
        props = {
          ...props,
          ...propObj,
        }
      }
      return props
    }
    return (prop) ? prop : {}
  }
  /**
   * [node description]
   * @param  {[type]} path [description]
   * @return {[type]}      [description]
   */
  node (path, variants) {
    const paths = path.split('.')
    const props = this.findNextNode(paths)
    let propsObj = {}
    props.forEach(({prop, value}) => {
      propsObj = {...propsObj, ...this.prop(value)}
    })
    return propsObj
  }
  /**
   * [findNextNode description]
   * @param  {[type]} paths      [description]
   * @param  {Array}  [props=[]] [description]
   * @param  {[type]} root       [description]
   * @return {[type]}            [description]
   */
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
      for(let variant in cascadeVariants) {
        let variantKey = cascadeVariants[variant]
        let variantValue = rootObj[variantKey] || {}
        if (!(variantValue instanceof Object) || (variantValue instanceof Array)) {
          valueObj[variantKey] = {value: variantValue}
        } else {
          valueObj[variantKey] = variantValue
        }
      }
      props.push({prop, value:valueObj})
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

module.exports = CascadeProps
