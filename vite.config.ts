import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from "path";
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss-webpack-plugin/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ThorUIResolver } from './resolver';
import rem2px from 'postcss-rem-to-responsive-pixel';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
const isH5 = process.env.UNI_PLATFORM === 'h5';
const isApp = process.env.UNI_PLATFORM === 'app';
const WeappTailwindcssDisabled = isH5 || isApp;

const vitePlugins = [
  WeappTailwindcssDisabled ? undefined : uvtw(),
  AutoImport({
    imports: [
      "vue",
      "uni-app",
      "pinia",
    ],
    ignore: ['createApp'],
    dirs: [
      'src/hooks',
      'src/store',
      'src/server'
    ]
  }),
  Components({
    resolvers: [
      ThorUIResolver()
    ],
    dirs: [
      'src/components'
    ]
  }),
  uni(),
];
// postcss 插件配置
const postcssPlugins:any[] = [tailwindcss(), autoprefixer()]
if (!WeappTailwindcssDisabled) {
  postcssPlugins.push(
    rem2px({
      rootValue: 32,
      propList: ['*'],
      transformUnit: 'rpx'
    })
  );
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
          additionalData: `
            @import "@/styles/icons/iconfont.scss";
            @import "uniapp-nutui/styles/variables.scss";
          `
        }
      },
      postcss: {
        plugins: postcssPlugins
      }
    },
    server: {
      proxy: {
        '/api-prefix-dev': {
          target: '/',
          secure: false,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api-prefix-dev/, '')
        }
      }
    }
  });  
});