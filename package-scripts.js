const {series, concurrent} = require('nps-utils')

module.exports = {
  scripts: {
    contributors: {
      add: 'all-contributors add',
      generate: 'all-contributors generate',
    },
    default: 'nps test.watch',
    lint: 'eslint exercises-final templates demos scripts',
    format: {
      templates: 'prettier-eslint --write "templates/**/*.js"',
      exercises: 'prettier-eslint --write "exercises*/**/*.js"',
    },
    precommit: {
      description: 'our pre-commit hook',
      script: series(
        series.nps('format.templates', 'generate', 'lint', 'format.exercises'),
        concurrent.nps('test.demos', 'test.final'),
        'git add exercises exercises-final'
      ),
    },
    test: {
      default: 'jest --config=exercises/jest.config.json',
      demos: {
        default: 'jest --config=demos/jest.config.json',
        watch: 'nps "test.demos --watch"',
      },
      changed: 'nps --silent "test --onlyChanged"',
      watch: 'nps "test --watch"',
      final: {
        default: 'jest --config=exercises-final/jest.config.json',
        watch: 'nps "test.final --watch"',
      },
    },
    dev: series(
      'nps generate',
      concurrent.nps('generate.watch', 'test.final.watch')
    ),
    generate: {
      watch: 'onchange "templates/**/*.*" --initial -- nps generate',
      default: 'split-guide generate --silent-success',
    },
    autofillEmail: series(
      'node ./scripts/autofill-feedback-email',
      'git commit -am "autofill-email"'
    ),
    validate: {
      script: series.nps('lint', 'test.final'),
      full: concurrent.nps('validate.generated', 'test.demos'),
      generated: series.nps('generate', 'lint', 'test.final'),
    },
    setup: series(
      'node ./scripts/verify',
      'node ./scripts/install',
      'nps validate'
    ),
  },
}

// this is not transpiled
/*
  eslint
  comma-dangle: [
    2,
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      functions: 'never'
    }
  ]
 */
