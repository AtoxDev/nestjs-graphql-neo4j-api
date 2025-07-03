const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
  },
  externals: {
    'neo4j-driver': 'commonjs neo4j-driver',
    '@nestjs/common': 'commonjs @nestjs/common',
    '@nestjs/core': 'commonjs @nestjs/core',
    '@nestjs/platform-express': 'commonjs @nestjs/platform-express',
    '@nestjs/graphql': 'commonjs @nestjs/graphql',
    '@nestjs/apollo': 'commonjs @nestjs/apollo',
    'graphql': 'commonjs graphql',
    'reflect-metadata': 'commonjs reflect-metadata',
    'rxjs': 'commonjs rxjs',
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ["./src/assets"],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    })
  ],
};
