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
      script: 'eslint exercises-final templates demos/templates scripts',
    },
    format: {
      templates: {
        hiddenFromHelp,
        script: oneLine`
          prettier-eslint
          --write
          "templates/**/*.js"
          "demos/templates/**/*.js"
        `,
      },
      exercises: {
        hiddenFromHelp,
        script: oneLine`
          prettier-eslint
          --write
          "exercises*/**/*.js"
          "demos/start/**/*.js"
          "demos/finished/**/*.js"
        `,
      },
    },
    precommit: {
      hiddenFromHelp,
      description: 'our pre-commit hook',
      script: series(
        series.nps('format.templates', 'split', 'lint', 'format.exercises'),
        concurrent.nps('test.demos', 'test.final'),
        'git add exercises exercises-final demos/start demos/finished'
      ),
    },
    test: {
      default: {
        description: 'run the exercises tests',
        script: 'jest --config=exercises/jest.config.json --coverage',
      },
      changed: {
        description: oneLine`
          run the exercises tests for files which
          have changed since the last commit
        `,
        script: 'jest --config=exercises/jest.config.json --onlyChanged',
      },
      watch: {
        description: 'run the exercises tests in watch mode',
        script: 'jest --config=exercises/jest.config.json --watch',
      },
      demos: jest('demos/finished/jest.config.json', {hiddenFromHelp}),
      final: jest('exercises-final/jest.config.json', {hiddenFromHelp}),
      all: {
        hiddenFromHelp,
        script: concurrent.nps('test.demos', 'test.final'),
      },
    },
    dev: {
      exercises: {
        hiddenFromHelp,
        script: concurrent.nps('split.watch', 'test.final.watch'),
      },
      demos: {
        hiddenFromHelp,
        script: concurrent.nps('split.watch', 'test.demos.watch'),
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
          script: 'split-guide generate --silent-success',
        },
        watch: {
          hiddenFromHelp,
          script: oneLine`
            onchange
            "templates/**/*.*"
            --initial
            --
            nps split.exercises
          `,
        },
      },
      demos: {
        default: {
          hiddenFromHelp,
          script: oneLine`
            split-guide generate
            --templates-dir demos/templates
            --exercises-dir demos/start
            --exercises-final-dir demos/finished
            --silent-success
          `,
        },
        watch: {
          hiddenFromHelp,
          script: oneLine`
            onchange
            "demos/templates/**/*.*"
            --initial
            --
            nps split.demos
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
        script: series.nps('lint', 'test.all'),
      },
      full: {
        hiddenFromHelp,
        script: concurrent.nps('split', 'lint', 'test.all'),
      },
    },
  },
}

function jest(config, assign = {}) {
  return {
    default: Object.assign(
      {script: `jest --config=${config} --coverage`},
      assign
    ),
    changed: Object.assign(
      {script: `jest --config=${config} --onlyChanged`},
      assign
    ),
    watch: Object.assign({script: `jest --config=${config} --watch`}, assign),
  }
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
