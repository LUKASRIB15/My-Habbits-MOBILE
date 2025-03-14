const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {wrapWithReanimatedMetroConfig} = require('react-native-reanimated/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer/expo")
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg")
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"]

module.exports = wrapWithReanimatedMetroConfig(
  withNativeWind(
    config,
    {
      input: "./src/global.css",
      typescriptEnvPath: "./src/@types/nativewind-env.d.ts",
    }
  )
)
