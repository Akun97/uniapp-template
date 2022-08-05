```
#运行小程序端
npm run dev:mp-weixin
#运行h5端
npm run dev:h5
#打包
npm run build:mp-weixin
npm run build:h5
```

大致描述，具体详见代码

目录结构:

![](https://github.com/Akun97/uniapp_template/blob/master/directory.png?raw=true)

项目配置:

1.集成unplugin-auto-import，自动导入ts文件,尽量减少import语句的使用,详细部分见：vite.config.ts

2.集成tailwindcss,只需要书写class样式名，可完全免写css代码，公共样式配置详见：tailwind.config.js

文档：https://tailwindcss.com/

3.ui框架：uni-ui:https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html

thorui:https://thorui.cn/doc/docs/introduce.html

通过easycom自动引入，无需再写import语句

自定义组件遵循easycom命名方式:components/组件名/组件名.vue

**4.自定义组件看注释**

custom-image:自定义图片组件，自带加载占位效果

custom-page:页面组件，所有页面使用该组件实现，集成自定义tabbar,自定义navbar,刷新加载列表功能

custom-picker:自定义单项选择器

navbar:自定义navbar，已集成进custom-page组件

no-data:空数据占位组件

tabbar:自定义tabbar,已集成进custom-page组件，特殊样式可自行更改

transparent-navbar: 定位透明，可根据页面滚动变色navbar,已集成进custom-page组件

scroll-swiper-tab: tab标签可滑动切换多个列表，带有刷新功能

sticky-view: 吸顶列表组件