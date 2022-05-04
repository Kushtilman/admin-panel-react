module.exports = {
  'env': {
    'node': true,
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'sourceType': 'module',
  },
  'plugins': [ 'react' ],
  'rules': {
    'indent': [ 'error', 2, { 'SwitchCase': 1 } ],
    'linebreak-style': 0,
    'quotes': [ 'error', 'single'],
    'semi': [ 'error', 'always' ],
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'ignore',
    }],
    'no-console': 'off',
    'object-curly-spacing': 'off',
    'array-bracket-spacing': 'off',
    'require-jsdoc': 'off',
    'max-len': [
      1,
      120,
      4,
      { ignoreComments: true, ignoreUrls: true, ignoreStrings: true },
    ],
    'camelcase': 'off',
    'new-cap': 'off',
  },
};
