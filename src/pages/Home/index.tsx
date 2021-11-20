import {
    HomeContainer,
    HomeHeaderMain,
    LoginName,
    ChangeProfileContainer,
    LogOutIcon,
    HomeBody,
    ProfileContainer,
    ProfilePic,
    Name,
    MainInfoContainer,
    NameLocationContainer,
    Square,
    InfosContainer,
    InfoContainer,
    InfoNumber,
    InfoName,
    HomeFooter
} from './styles';

import { Navbar } from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/user/userSlice';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

export const Profile = () => {

    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
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

    const onSubmit = () => {
        dispatch(logout())
        toast.error("Usuário deslogado", {
            autoClose: 3000
        })
    }

    return (
        <HomeContainer>
            <HomeHeaderMain>
                <LoginName to={`/home`} style={{ marginLeft: '20px' }}>
                    #{user.login}
                </LoginName  >
                <ChangeProfileContainer to='/' style={{ right: '10px' }} onClick={() => onSubmit()}>
                    Sair<LogOutIcon color={'red'} />
                </ChangeProfileContainer>
            </HomeHeaderMain>
            <HomeBody>
                <ProfileContainer>
                    <ProfilePic src={user.avatar_url} />
                </ProfileContainer>
                <MainInfoContainer>
                    <Square />
                    <NameLocationContainer>
                        <Name>{user.name}</Name>
                        <InfoName>{user.email}</InfoName>
                        <InfoName>{user.location}</InfoName>
                    </NameLocationContainer>
                </MainInfoContainer>
                <InfosContainer>
                    <InfoContainer to={`/followers`}>
                        <InfoNumber>{user.followers}</InfoNumber>
                        <InfoName>Seguidores</InfoName>
                    </InfoContainer>
                    <InfoContainer to={`/following`}>
                        <InfoNumber>{user.following}</InfoNumber>
                        <InfoName>Seguindo</InfoName>
                    </InfoContainer>
                    <InfoContainer to={`/repos`}>
                        <InfoNumber>{user.public_repos}</InfoNumber>
                        <InfoName>Repos</InfoName>
                    </InfoContainer>
                </InfosContainer>
                <MainInfoContainer>
                    <Square />
                    <NameLocationContainer>
                        <Name>Bio</Name>
                        <InfoName>{user.bio}</InfoName>
                    </NameLocationContainer>
                </MainInfoContainer>
            </HomeBody>
            <HomeFooter>
                <Navbar activePage='home' />
            </HomeFooter>
        </HomeContainer>
    )
}

