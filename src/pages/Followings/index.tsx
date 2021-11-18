import {
  FollowingsContainer,
  FollowingsHeader,
  ExitContainer,
  ExitIcon,
  NumberOfFollowers,
  FollowingsBody,
  FollowingContainer,
  Square,
  ProfilePic,
  LoginName,
  AcessFollowingIcon,
  AcessContainerFollowing,
  FollowingsFooter
} from './styles'

import { Paginator } from '../../components/Paginator';
import { Navbar } from '../../components/Navbar'

import { dataTypes } from '../../interface';
import { useSelector, useDispatch } from 'react-redux';
import { getAnotherUserAsync } from '../../store/anotherUser/anotherUserSlice';
import { RootState } from '../../store';

import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const Followings = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const userName = user.login

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
    dispatch(getAnotherUserAsync(name))
  }

  const showData = (following: dataTypes) => {
    return (
      <FollowingContainer key={following.id} onClick={() => onSubmit(following.login || '')} to={`/anotherUser`}>
        <Square />
        <ProfilePic src={following.avatar_url} />
        <LoginName>#{following.login}</LoginName>
        <AcessContainerFollowing >
          <AcessFollowingIcon />
        </AcessContainerFollowing>
      </FollowingContainer>)
  }

  return (
    <FollowingsContainer>
      <FollowingsHeader>
        <ExitContainer to={`/home`}>
          <ExitIcon />
        </ExitContainer>
        <NumberOfFollowers>
          Seguindo {user.following}
        </NumberOfFollowers>
      </FollowingsHeader>
      <FollowingsBody>
        <Paginator
          typePage={'following'}
          showData={showData}
          numOfElements={user.following}
          userName={userName}
        />
      </FollowingsBody>
      <FollowingsFooter>
        <Navbar activePage='following' />
      </FollowingsFooter>
    </FollowingsContainer>
  )
}