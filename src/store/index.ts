import { InjectionKey } from '@vue/runtime-core';
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { RootGettersReturnType } from '@/store/type';
import * as base from "@/store/modules/base";

const debug = process.env.NODE_ENV !== 'production';

// 定义RootState类型，将所有模块类型放入
export type RootState = {
  [base.ModuleName]: base.ModuleState
}

export type RootGetters = RootGettersReturnType<base.ModuleGetters, typeof base.ModuleName>

export type RootMutations = {
  [base.ModuleName]: base.ModuleMutations
}

export type RootActions = {
  [base.ModuleName]: base.ModuleActions
}

export type RootStore = base.ModuleStore

export const modules = {
  [base.ModuleName]: base.store
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store: Store<RootState> = createStore({
  modules: modules,
  strict: debug
});

export function useStore(): RootStore {
  return baseUseStore(key);
}