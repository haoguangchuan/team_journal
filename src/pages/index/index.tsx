import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import { teamApi } from '@/api'
import { TEAM_ID } from '@/config/env'
import teamLogo from '@/assets/images/logo/logo.png'
import './index.scss'

export default function Index () {
  const [teamName, setTeamName] = React.useState('')

  useLoad(() => {
    teamApi
      .getDetail(TEAM_ID)
      .then((team) => setTeamName(team.name))
      .catch(() => setTeamName(''))
  })

  return (
    <View className='index page'>
      <NavBar title='队记' />
      <View className='index-body page-safe-area-bottom'>
        <View className='team-info'>
          <Image
            className='team-info__logo'
            src={teamLogo}
            mode='aspectFit'
          />
          <Text className='team-info__name'>
            {teamName || '加载中...'}
          </Text>
        </View>
      </View>
    </View>
  )
}
