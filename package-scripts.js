const {series, concurrent, commonTags} = require('nps-utils')

const {oneLine} = commonTags

const hiddenFromHelp = true

module.exports = {
  scripts: {
    default: {
      description: 'runs the test.watch script.',
      script: 'nps test.watchAll',
    },
    exercise: {
      eslint: getExercises('no-console', 'eslint'),
      babel: getExercises('captains-log', 'babel'),
      codemod: getExercises('ymnn-jquery', 'codemod'),
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
      script: 'eslint other/final',
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
      watchAll: {
        description: 'run the exercises tests in watch mode',
        script: 'jest --watchAll',
      },
      final: {
        default: 'jest --projects other/final',
        watch: 'jest --projects other/final --watch',
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
    validate: {
      default: {
        hiddenFromHelp,
        script: series.nps('lint', 'test.final'),
      },
    },
  },
}

function getExercises(exerciseName, scriptName) {
  return [0, 1, 2, 3, 4, 5, 6].reduce((acc, number) => {
    acc[number] = oneLine`
      node
      ./scripts/copy-exercise.js
      ${exerciseName}
      ${number}
      ${scriptName}
    `
    return acc
  }, {})
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
