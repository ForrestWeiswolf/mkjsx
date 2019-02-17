function createComponent(name, options) {
  const imports = (
    `import React${options.stateful ? ', { Component }' : ''} from 'react'\n` +
    (options.propTypes ? `import PropTypes from 'prop-types'\n\n` : '\n')
  )

  let component
  if (options.stateful) {
    let binds = ''
    let methods = ''

    options.methods.forEach(methodName => {
      binds += `    this.${methodName} = this.${methodName}.bind(this)\n`
      methods += `  ${methodName}() {}\n\n`
    })

    component = (
      `class ${name} extends Component {\n` +
      `  constructor(props) {\n` +
      `    super(props)\n` +
      `    this.state = {}\n` +
      binds +
      `  }\n\n` +
      methods +
      `  render(){\n` +
      `    return (\n` +
      `      <div></div>\n` +
      `    )\n` +
      `  }\n` +
      `}\n\n`
    )
  } else {
    component = (
      `const ${name} = props => {\n` +
      `  return (\n` +
      `    <div>\n` +
      `    </div>\n` +
      `  )\n` +
      `}\n\n`
    )
  }

  const propTypes = (
    `${name}.propTypes = {\n` +
    `}\n\n`
  )

  const exportComponent = `export default ${name}`

  return imports + component + (options.propTypes ? propTypes : '') + exportComponent
}

module.exports = createComponent