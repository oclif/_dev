const {
  setColors,
  concurrent,
} = require('nps-utils')

setColors(['dim'])

const script = (script, description) => description ? {script, description} : {script}

const linters = {
  eslint: script('eslint .', 'lint js files'),
  commitlint: script('commitlint --from origin/master', 'ensure that commits are in valid conventional-changelog format'),
}

const scripts = {
  ...linters,
  lint: concurrent(linters),
  test: concurrent(linters),
}

module.exports = {scripts}
