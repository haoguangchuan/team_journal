import Taro from '@tarojs/taro'

export interface NavBarLayout {
  statusBarHeight: number
  navBarHeight: number
  paddingRight: number
}

/** 获取与微信小程序胶囊按钮对齐的导航栏尺寸 */
export function getNavBarLayout (): NavBarLayout {
  const { statusBarHeight = 0, screenWidth = 375 } = Taro.getWindowInfo()
  const menuButton = Taro.getMenuButtonBoundingClientRect()

  const navBarHeight =
    (menuButton.top - statusBarHeight) * 2 + menuButton.height

  return {
    statusBarHeight,
    navBarHeight,
    paddingRight: screenWidth - menuButton.left,
  }
}
