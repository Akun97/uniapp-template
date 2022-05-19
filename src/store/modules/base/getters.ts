import { GetterTree } from 'vuex';
import { RootState, RootGetters } from '@/store/index';
import { GettersReturnType } from '@/store/type';
import { ModuleState } from '@/store/modules/base/state';

type GettersType = {
  tabbarShow: boolean,
  tabbarIndex: number
}

const GettersTypes = {
  tabbarShow: 'tabbarShow',
  tabbarIndex: 'tabbarIndex'
} as const

type VGettersTypes = (typeof GettersTypes)[keyof typeof GettersTypes]

export type ModuleGetters = {
  readonly [key in VGettersTypes]: (
    state: ModuleState, getters: GettersReturnType<ModuleGetters, key>, rootState: RootState, rootGetters: RootGetters
  ) => GettersType[key]
}

export const getters: GetterTree<ModuleState, RootState> & ModuleGetters = {
  [GettersTypes.tabbarShow]: (state, getters, rootState, rootGetters) => {
    return state.tabbarShow;
  },
  [GettersTypes.tabbarIndex]: (state, getters, rootState, rootGetters) => {
    return state.tabbarIndex;
  }
}