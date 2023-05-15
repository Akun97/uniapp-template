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
      },
      textColor: {
        // 'black': {
        //   100: '#333333',
        //   200: '#101A33',
        //   300: '#3D4458',
        //   400: '#2A2639',
        //   500: '#483017'
        // }
      },
      backgroundColor: {
        // 'gray': {
        //   100: '#F8FCFB',
        //   200: '#F8FAFF',
        //   300: '#FEFBF8',
        //   400: '#6E748B',
        //   500: '#F4F7F7'
        // }
      },
      backgroundImage: {
        // 无数据占位
        'no-data': `url('@/static/common/no_data.png')`,
        'no-record': `url('@/static/common/no_record.png')`,
        'no-result': `url('@/static/common/no_result.png')`,
      },
      backgroundSize: {
        'full': '100% 100%'
      },
      borderColor: {},
      boxShadow: {
        '0081-#E0EAE9-05': '0 0 8rpx 1rpx rgba(224,234,233, .5)'
      },
      gridTemplateRows: {},
      gridTemplateColumns: {}
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}