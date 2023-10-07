const backgroundUrl = require('vite').loadEnv(process.env.NODE_ENV, process.cwd()).VITE_OSS_URL;
module.exports = {
  important: true,
  content: [
    './index.html', 
    './src/**/*.{html,js,ts,jsx,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        'theme': '#31C6B2',
        'tabbar-default': '#A8ACB3',
        'tabbar-selected': '#44AEA0',
      },
      textColor: {},
      backgroundColor: {},
      backgroundImage: {
        // 无数据占位
        'no-data': `url('@/static/common/no_data.png')`,
        'no-record': `url('@/static/common/no_record.png')`,
        'no-result': `url('@/static/common/no_result.png')`,
        '404': `url('@/static/common/no_found.png')`,
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