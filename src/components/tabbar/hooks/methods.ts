export const constructFunc = () => {

  const tabbarList = markRaw<Tabbar[]>([
    { 
      icon: '/static/tabbar/icon_index_default.png', 
      selectIcon: '/static/tabbar/icon_index_selected.png',
      path: '/pages/index/index', 
      position: 'other', 
      text: 'tab1',
      keep: false,
      hidden: false,
      index: 0
    },
    { 
      icon: '/static/tabbar/icon_group_default.png', 
      selectIcon: '/static/tabbar/icon_group_selected.png',
      path: '/pages/educate/index', 
      position: 'other', 
      text: 'tab2',
      keep: false,
      hidden: false,
      index: 1
    },
    { 
      icon: '/static/tabbar/icon_publish.png', 
      selectIcon: '', 
      path: '/pages/celebrate/index', 
      position: 'center', 
      text: '',
      keep: false,
      hidden: false,
      index: 2
    },
    { 
      icon: '/static/tabbar/icon_template_default.png', 
      selectIcon: '/static/tabbar/icon_template_selected.png', 
      path: '/pages/donate/index', 
      position: 'other', 
      text: 'tab4',
      keep: false,
      hidden: false,
      index: 3
    },
    { 
      icon: '/static/tabbar/icon_user_default.png', 
      selectIcon: '/static/tabbar/icon_user_selected.png', 
      path: '/pages/member/index', 
      position: 'other', 
      text: 'tab5',
      keep: false,
      hidden: false,
      index: 4
    }
  ]);
  const store = useStore();
  const tabbarShow = computed(() => store.getters['base/tabbarShow']);
  const tabbarIndex = computed(() => store.getters['base/tabbarIndex']);
  
  const tabbarChange = (index: number, path:string):void => {
    uni.switchTab({
      url: path,
      success: res => {
        store.commit('base/tabbarIndexUpdate', { index: index });
      }
    });
  }

  return {
    tabbarList,
    tabbarShow,
    tabbarIndex,
    tabbarChange
  }

}