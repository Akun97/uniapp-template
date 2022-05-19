import { MutationTree } from 'vuex';
import { ModuleState } from '@/store/modules/base/state';

const MutationTypes = {
  tabbarShowUpdate: 'tabbarShowUpdate',
  tabbarIndexUpdate: 'tabbarIndexUpdate'
} as const

export type ModuleMutations = {
  [MutationTypes.tabbarShowUpdate]<T extends { show: boolean }>(state: ModuleState, payload: T): void,
  [MutationTypes.tabbarIndexUpdate]<T extends { index: number }>(state: ModuleState, payload: T): void
}

export const mutations: MutationTree<ModuleState> & ModuleMutations = {
  [MutationTypes.tabbarShowUpdate] (state, { show }) {
    state.tabbarShow = show;
  },
  [MutationTypes.tabbarIndexUpdate] (state, { index }) {
    state.tabbarIndex = index;
  }
}