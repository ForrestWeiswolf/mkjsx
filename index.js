const fs = require('fs')
const yargs = require('yargs')
  .usage('Usage: $0 <ComponentNames> [options]')
  .demandCommand(1)
  .boolean('stateful')
  .alias('stateful', 's')
  .describe('s', 'Make a stateful component')
  .boolean('propTypes')
  .alias('propTypes', 'p')
  .default('p', true)
  .describe('p', 'Import PropTypes')
  .array('methods')
  .alias('methods', 'm')
  .describe('m', 'Define and bind methods for a stateful (-s) component')
  .array('redux')
  .alias('redux', 'react-redux')
  .alias('redux', 'r')
  .describe('r', 'Import react-redux and create mapState and mapDispatch functions')

const createComponent = require('./createComponent')

const argv = yargs.argv

function createFile(path, text) {
   fs.writeFile(`${path}.jsx`, text, {
    flag: 'wx'
  }, function (err) {
    if (err && err.code === 'EEXIST') {
      console.log(`${path}.jsx already exists!`)
    } else if (err) {
      console.log(err)
    } else {
      console.log(`Created ${path}.jsx`)
    }
  })
}

argv['_'].forEach(namepath => {
  const namepathArr = namepath.split('/')
  const componentName = namepathArr[namepathArr.length - 1]

  const componentText = createComponent(
    componentName,
    argv
  )

  createFile(namepath, componentText)
})