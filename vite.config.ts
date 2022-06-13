/*
 * @Author: Akun97 17759735780@163.com
 * @Date: 2022-05-19 10:26:36
 * @LastEditors: Akun97 17759735780@163.com
 * @LastEditTime: 2022-06-13 10:48:42
 * @FilePath: \uniapp_template\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from "path";
import { ViteWeappTailwindcssPlugin as vwt, postcssWeappTailwindcssRename } from 'weapp-tailwindcss-webpack-plugin'

const isH5 = process.env.UNI_PLATFORM === 'h5';

const vitePlugins = [uni(), !isH5 ? vwt() : undefined];
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