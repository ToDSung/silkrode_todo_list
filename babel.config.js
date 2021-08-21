module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        'useBuiltIns': "usage",
        'corejs': '3.0.0',
        "targets": {
          'ie': '11'
        }
      }
    ]
  ],
  plugins: [
    [
      "babel-plugin-root-import",

      {
        "paths": [
          {
            "rootPathSuffix": "src",
            "rootPathPrefix": "@/"
          },
        ]
      }
    ]
  ]
};