import { Module } from 'vuex';
import { RootState, RootMutations, RootActions } from '@/store/index';
import { TStore, TCommit, TDispatch } from '@/store/type';
import { ModuleState, state } from '@/store/modules/base/state';
export { ModuleState } from '@/store/modules/base/state';
import { ModuleGetters, getters } from '@/store/modules/base/getters';
export { ModuleGetters } from '@/store/modules/base/getters';
import { ModuleMutations, mutations } from '@/store/modules/base/mutations';
export { ModuleMutations } from '@/store/modules/base/mutations';
import { ModuleActions, actions } from '@/store/modules/base/actions';
export { ModuleActions } from '@/store/modules/base/actions';

export const ModuleName = 'base';

export type ModuleStore = TStore<
  { [ModuleName]: ModuleState }, TCommit<ModuleMutations, RootMutations, true>,
  TDispatch<ModuleActions, RootActions, true>,
  { [key in keyof ModuleGetters as `${typeof ModuleName}/${key}`]: ReturnType<ModuleGetters[key]> }
>

export const store: Module<ModuleState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}