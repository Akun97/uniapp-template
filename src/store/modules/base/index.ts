/*
 * @Author: Akun97 17759735780@163.com
 * @Date: 2022-05-19 10:26:48
 * @LastEditors: Akun97 17759735780@163.com
 * @LastEditTime: 2022-06-13 10:17:39
 * @FilePath: \uniapp_template\src\store\modules\base\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from 'vuex';
import { RootState, RootMutations, RootActions } from '@/store/index';
import { TStore, TCommit, TDispatch } from '@/store/type';
import { ModuleState as AModuleState, state } from '@/store/modules/base/state';
import { ModuleGetters as AModuleGetters, getters } from '@/store/modules/base/getters';
import { ModuleMutations as AModuleMutations, mutations } from '@/store/modules/base/mutations';
import { ModuleActions as AModuleActions, actions } from '@/store/modules/base/actions';

export type ModuleState = AModuleState;
export type ModuleGetters = AModuleGetters;
export type ModuleMutations = AModuleMutations;
export type ModuleActions = AModuleActions;

export const ModuleName = 'base';

export type ModuleStore = TStore<
  { [ModuleName]: AModuleState }, TCommit<AModuleMutations, RootMutations, true>,
  TDispatch<AModuleActions, RootActions, true>,
  { [key in keyof AModuleGetters as `${typeof ModuleName}/${key}`]: ReturnType<AModuleGetters[key]> }
>

export const store: Module<AModuleState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}