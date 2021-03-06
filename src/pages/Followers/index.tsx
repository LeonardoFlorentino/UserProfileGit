import {
  FollowersContainer,
  FollowersHeader,
  ExitContainer,
  ExitIcon,
  NumberOfFollowers,
  FollowersBody,
  FollowerContainer,
  Square,
  ProfilePic,
  LoginName,
  AcessFollowerIcon,
  AcessContainerFollower,
  FollowersFooter
} from './styles'


import { Navbar } from '../../components/Navbar'
import { dataTypes } from '../../interface'
import { Paginator } from '../../components/Paginator'

import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../providers/auth';

export const Followers = () => {

  const {user, getAnotherUser} = useAuth()
  const userName= user.login

  const history = useHistory()

  useEffect(() => {
    if (!user.isLogged) {
      history.push('/')
      toast.error("Usuário não logado", {
        autoClose: 3000
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const onSubmit = (name: string) => {
    getAnotherUser(name)
  }

  const showData = (follower: dataTypes) => {
    return (
      <FollowerContainer key={follower.id}
        onClick={() => onSubmit(follower.login || '')}
        to={{ pathname: `/anotherUser` }}>
        <Square />
        <ProfilePic src={follower.avatar_url} />
        <LoginName>#{follower.login}</LoginName>
        <AcessContainerFollower >
          <AcessFollowerIcon />
        </AcessContainerFollower>
      </FollowerContainer>)
  }

  return (
    <FollowersContainer>
      <FollowersHeader>
        <ExitContainer to={`/home`}>
          <ExitIcon />
        </ExitContainer>
        <NumberOfFollowers>
          {user.followers} seguidores
        </NumberOfFollowers>
      </FollowersHeader>
      <FollowersBody>
        <Paginator
          typePage={'followers'}
          showData={showData}
          numOfElements={user.followers}
          userName={userName}
        />
      </FollowersBody>
      <FollowersFooter>
        <Navbar activePage='followers' />
      </FollowersFooter>
    </FollowersContainer>
  )
}