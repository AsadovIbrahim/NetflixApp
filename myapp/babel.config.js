module.exports = {
  presets: ['module:@react-native/babel-preset','nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@contexts': './src/contexts',
          '@stacks': './src/stacks',
          '@icons': './assets/icons',
          '@images': './assets/images',
          '@locales': './src/locales',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@common': './src/common',
        },
      },
    ],
  ],
};
