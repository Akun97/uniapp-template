/*
 * @Author: Akun97 17759735780@163.com
 * @Date: 2022-06-13 11:11:59
 * @LastEditors: Akun97 17759735780@163.com
 * @LastEditTime: 2022-06-13 11:12:23
 * @FilePath: \uniapp_template\src\hooks\update.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const update = () => {

  if (uni.canIUse('getUpdateManager')) {
    const updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate(res => {
      if (res.hasUpdate) {

        updateManager.onUpdateReady(() => {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: modal => {
              if (modal.confirm) {
                updateManager.applyUpdate();
              }
            }
          });
        });

        updateManager.onUpdateFailed(() => {
          uni.showModal({
            title: "已经有新版本了哟~",
            content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
          });
        });

      }
    });
  }

}