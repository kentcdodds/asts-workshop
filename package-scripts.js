const {series, concurrent, commonTags} = require('nps-utils')

const {oneLine} = commonTags

const hiddenFromHelp = true

module.exports = {
  scripts: {
    default: {
      description: 'runs the test.watch script.',
      script: 'nps test.watch',
    },
    contributors: {
      add: {
        description: 'run this to add yourself to the contributors table',
        script: 'all-contributors add',
      },
      generate: {
        description: oneLine`
          run this if you've manually updated the
          .all-contributorsrc and need to regenerate
          the contributors table.
        `,
        script: 'all-contributors generate',
      },
    },
    lint: {
      hiddenFromHelp,
      script: 'eslint exercises',
    },
    test: {
      default: {
        description: 'run the exercises tests',
        script: 'jest',
      },
      changed: {
        description: oneLine`
          run the exercises tests for files which
          have changed since the last commit
        `,
        script: 'jest --onlyChanged',
      },
      watch: {
        description: 'run the exercises tests in watch mode',
        script: 'jest --watch',
      },
    },
    split: {
      default: {
        hiddenFromHelp,
        script: concurrent.nps('split.exercises', 'split.demos'),
      },
      exercises: {
        default: {
          hiddenFromHelp,
          script: oneLine`
            split-guide generate
            --templates-dir other/old-exercises/templates
            --exercises-dir other/old-exercises/exercises
            --exercises-final-dir other/old-exercises/exercises-final
            --silent-success
          `,
        },
      },
      demos: {
        default: {
          hiddenFromHelp,
          script: oneLine`
            split-guide generate
            --templates-dir other/old-demos/templates
            --exercises-dir other/old-demos/start
            --exercises-final-dir other/old-demos/final
            --silent-success
          `,
        },
      },
    },
    autofillEmail: {
      description: 'autofills the feedback links with your email address',
      script: series(
        'node ./scripts/autofill-feedback-email',
        'git commit -am "autofill-email"'
      ),
    },
    validate: {
      default: {
        hiddenFromHelp,
        script: series.nps('lint', 'test'),
      },
    },
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
