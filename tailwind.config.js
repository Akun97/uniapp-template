/*
 * @Author: Akun97 17759735780@163.com
 * @Date: 2022-05-19 10:26:36
 * @LastEditors: Akun97 17759735780@163.com
 * @LastEditTime: 2022-06-13 11:33:43
 * @FilePath: \uniapp_template\tailwind.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const backgroundUrl = require('vite').loadEnv(process.env.NODE_ENV, process.cwd()).VITE_OSS_URL;
module.exports = {
  important: true,
  content: [
    './index.html', 
    './src/components/**/*.{html,js,ts,jsx,tsx,vue}',
    './src/components/**/**/*.{html,js,ts,jsx,tsx,vue}',
    './src/pages/**/*.{html,js,ts,jsx,tsx,vue}',
    './src/**/**/**/*.{html,js,ts,jsx,tsx,vue}',
    './src/**/**/**/**/*.{html,js,ts,jsx,tsx,vue}',
    './src/*.{html,js,ts,jsx,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        'theme': '#31C6B2',
        'tabbar-default': '#A8ACB3',
        'tabbar-selected': '#44AEA0',
        // 渐变色
        // 'gradient-from-theme': '#29C1AD',
        // 'gradient-to-theme': '#59DDD5',
        // 'gradient-from-gold': '#FDF2D9',
        // 'gradient-to-gold': '#F2D6AB',
      },
      textColor: {
        // 'white': '#FFFFFF',
        // 'black': {
        //   100: '#333333',
        //   200: '#101A33',
        //   300: '#3D4458',
        //   400: '#2A2639',
        //   500: '#483017'
        // },
        // 'gray': {
        //   100: '#6E748B',
        //   200: '#DEE1E1'
        // },
        // 'green': '#50C8AA',
        // 'blue': '#4F7DF9',
        // 'orange': '#FD9556',
        // 'gold': '#A28664',
        // 'red': '#FD716A'
      },
      backgroundColor: {
        // 'white': '#FFFFFF',
        // 'gray': {
        //   100: '#F8FCFB',
        //   200: '#F8FAFF',
        //   300: '#FEFBF8',
        //   400: '#6E748B',
        //   500: '#F4F7F7'
        // },
        // 'blue': '#4E9DE7',
        // 'green': '#CBF1F5'
      },
      backgroundImage: {
        // 无数据占位
        'no-data': `url('${backgroundUrl}/20220610/effe2afb2d1c41fea1bf679780b0e030.png')`
      },
      borderColor: {
        // 'gray': '#D1D6E3',
        // 'gold': '#A28664',
        // 'form': '#DADDE6'
      },
      boxShadow: {
        '0081-#E0EAE9-05': '0 0 8rpx 1rpx rgba(224,234,233, .5)'
        // '0361-#D5DFDE-05': '0 3rpx 6rpx 1rpx rgba(213,223,222, .5)',
        // '0381-#E0E3EA-05': '0 3rpx 8rpx 1rpx rgba(224,227,234, .5)',
        // '1100-#FDF9F3-1200-EFD2A5-083': '1rpx 1rpx 0 0 rgba(253,249,243), -1rpx -2rpx 0 0 rgba(239,210,165, .5)',
        // '0381-#F2D09C-05': '0 3rpx 8rpx 1rpx rgba(242,208,156, .5)',
        // '0270-#4F7EF9-05': '0 2rpx 7rpx 0 rgba(79,126,249, .5)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
  corePlugins: {
    preflight: false
  }
}