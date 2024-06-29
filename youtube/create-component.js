var execSync = require('child_process').execSync
var readline = require('readline')

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('Please enter the component name: ', function (componentName) {
  if (!componentName) {
    console.error('Please provide a component name.')
  } else {
    var command = 'ng generate component ' + componentName
    try {
      execSync(command, { stdio: 'inherit' })
      console.log('Component ' + componentName + ' created successfully.')
    } catch (error) {
      console.error('Error creating component: ' + error)
    }
  }
  rl.close()
})
