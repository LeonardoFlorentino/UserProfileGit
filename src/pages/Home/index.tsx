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

import { RouteParams } from '../../interface'

import { Navbar } from '../../components/Navbar'

import { useParams } from 'react-router-dom';
import { useEffect } from 'react'


export const Profile = (props: any) => {
    const { mainUserName  }: RouteParams = useParams()
    const { userName, setUserName, user, setUser, fetchData } = props

    useEffect(() => {
            fetchData(mainUserName, 'mainUser');
    }, [userName, fetchData,mainUserName]);



    return (
        <HomeContainer>
            <HomeHeaderMain>
                <LoginName to={`/user/${mainUserName}`} style={{ marginLeft: '20px' }}>
                    #{user.login}
                </LoginName  >
                <ChangeProfileContainer to='/' onClick={() => { setUserName(''); setUser({}) }} style={{ right: '10px' }}>
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
                    <InfoContainer to={`/user/${mainUserName}/followers`}>
                        <InfoNumber>{user.followers}</InfoNumber>
                        <InfoName>Seguidores</InfoName>
                    </InfoContainer>
                    <InfoContainer to={`/user/${mainUserName}/followings`}>
                        <InfoNumber>{user.following}</InfoNumber>
                        <InfoName>Seguindo</InfoName>
                    </InfoContainer>
                    <InfoContainer to={`/user/${mainUserName}/repos`}>
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

