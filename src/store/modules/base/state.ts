export type ModuleState = {
  tabbarShow: boolean,
  tabbarIndex: number
}

export const state: () => ModuleState = () => ({
  tabbarShow: false,
  tabbarIndex: 0
});