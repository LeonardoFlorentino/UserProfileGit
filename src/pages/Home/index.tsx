import {
    HomeContainer,
    HomeHeader,
    LoginName,
    ExitContainer,
    Exit,
    HomeBody,
    ProfileContainer,
    ProfilePic,
    Name,
    InfoNameContainer,
    Square,
    InfoContainer,
    Info,
    ContainerInfoFollowers,
    ContainerInfoFollower,
    InfoFollower,
    ContainerBio,
    Footer

} from './styles';

// import { data } from '../../data/data'
import { Navbar } from '../../components/Navbar'

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'




interface dataTypes {
    name: string,
    login: string,
    avatar_url: string,
    email: string,
    location: string,
    followers: number,
    following: number,
    public_repos: number,
    bio: string

}

interface RouteParams {
    username: string,
    id: string
}

const URL= 'https://api.github.com/users'

export const Home = () => {
    // const { username }: RouteParams = useParams();
    const {id}: RouteParams = useParams()
    const [data, setData] = useState<dataTypes | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            // const newUrl = `${URL}/${username}`
            const response = await fetch(`${URL}/${id}`);
            const newData = await response.json();
            setData(newData);
        };
        fetchData();
    });
    if (data) {
        const { login,
            avatar_url,
            name,
            email,
            location,
            followers,
            following,
            public_repos,
            bio } = data
        return (
            <HomeContainer>
                <HomeHeader>
                    <LoginName>
                        #{login}
                    </LoginName>
                    <ExitContainer>
                        Sair<Exit />
                    </ExitContainer>
                </HomeHeader>
                <HomeBody>
                    <ProfileContainer>
                        <ProfilePic src={avatar_url} />
                    </ProfileContainer>
                    <InfoNameContainer>
                        <Name>
                            <Square />{name.toUpperCase()}
                        </Name>
                        <InfoContainer>
                            <Info>{email}</Info>
                            <Info>{location}</Info>
                        </InfoContainer>
                    </InfoNameContainer>
                    <ContainerInfoFollowers>
                        <ContainerInfoFollower>
                            <InfoFollower>{followers}</InfoFollower>
                            <Info>Seguidores</Info>
                        </ContainerInfoFollower>
                        <ContainerInfoFollower>
                            <InfoFollower>{following}</InfoFollower>
                            <Info>Seguindo</Info>
                        </ContainerInfoFollower>
                        <ContainerInfoFollower>
                            <InfoFollower>{public_repos}</InfoFollower>
                            <Info>Repos</Info>
                        </ContainerInfoFollower>
                    </ContainerInfoFollowers>
                    <ContainerBio>
                        <Name>
                            <Square />{'Bio'.toUpperCase()}
                        </Name>
                        <InfoContainer>
                            <Info>{bio}</Info>
                        </InfoContainer>
                    </ContainerBio>
                </HomeBody>
                <Footer>
                    <Navbar />
                </Footer>
            </HomeContainer>
        )
    } else {
        return null;
    }
}
