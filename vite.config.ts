import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from "path";
import { ViteWeappTailwindcssPlugin as vwt, postcssWeappTailwindcssRename } from 'weapp-tailwindcss-webpack-plugin';
import AutoImport from 'unplugin-auto-import/vite';
import vueApi from "./vue-api";
import uniappApi from "./uniapp-api";

const isH5 = process.env.UNI_PLATFORM === 'h5';

const vitePlugins = [
  uni(), 
  !isH5 ? vwt() : undefined,
  AutoImport({
    imports: [
      {
        "vue": vueApi,
        "@dcloudio/uni-app": uniappApi
      }
    ],
    dirs: [
      'src/hooks',
      'src/store',
      'src/server'
    ]
  })
];
// postcss 插件配置
const postcssPlugins = [require('autoprefixer')(), require('tailwindcss')()];
if (!isH5) {
  postcssPlugins.push(
    require('postcss-rem-to-responsive-pixel')({
      rootValue: 32,
      propList: ['*'],
      transformUnit: 'rpx'
    })
  );
  postcssPlugins.push(postcssWeappTailwindcssRename());
}
// https://vitejs.dev/config/
export default (({ mode }) => {
  return defineConfig({
    plugins: vitePlugins,
    define: {
      'process.env': loadEnv(mode, process.cwd())
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // 路径别名
      },
      extensions: ['.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名
    },
    css: {
      // css预处理
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/icons/iconfont.scss";'
        }
      },
      postcss: {
        plugins: postcssPlugins
      }
    }
  });  
});