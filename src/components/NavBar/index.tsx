import { View, Text } from '@tarojs/components'
import type { ReactNode } from 'react'
import { getNavBarLayout } from '@/utils/navBar'
import './index.scss'

interface NavBarProps {
  title: string
  /** 左侧区域，默认展示 title */
  left?: ReactNode
  /** 右侧操作区（自动避开胶囊按钮） */
  right?: ReactNode
}

export default function NavBar ({ title, left, right }: NavBarProps) {
  const { statusBarHeight, navBarHeight, paddingRight } = getNavBarLayout()

  return (
    <View
      className='nav-bar'
      style={{
        paddingTop: `${statusBarHeight}px`,
        paddingRight: `${paddingRight}px`,
      }}
    >
      <View
        className='nav-bar__inner'
        style={{ height: `${navBarHeight}px` }}
      >
        {left ?? <Text className='nav-bar__title'>{title}</Text>}
        {right ? <View className='nav-bar__extra'>{right}</View> : null}
      </View>
    </View>
  )
}
