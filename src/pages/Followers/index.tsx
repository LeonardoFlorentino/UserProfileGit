import {
  ContainerFollowers,
  ContainerHeader,
  GoBackButton,
  NumberOfFollowers,
  ContainerBody,
  ProfileContainer,
  Square,
  ProfilePic,
  LoginName,
  AcessButton,
  Footer
} from './styles'


import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'

import { Navbar } from '../../components/Navbar'

// import { data } from '../../data/data'
const URL = 'https://api.github.com/users'
interface dataTypes {
  name?: string,
  login?: string,
  avatar_url?: string,
  email?: string,
  location?: string,
  followers?: number,
  following?: number,
  public_repos?: number,
  bio?: string

}
interface RouteParams {
  username: string,
  id:string
}

export const Followers = () => {
  const {id}: RouteParams = useParams();
  const [data, setData] = useState<dataTypes | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const newUrl = `${URL}/${id}`
      const response = await fetch(newUrl);
      const newData = await response.json();
      setData(newData);
    };
    fetchData();
  });
  if (data) {
    const { followers, avatar_url, login} = data
    return (
      <ContainerFollowers>
        <ContainerHeader>
          <GoBackButton />
          <NumberOfFollowers>
            {followers} seguidores
          </NumberOfFollowers>
        </ContainerHeader>
        <ContainerBody>
          <ProfileContainer>
            <Square/>
            <ProfilePic  src={avatar_url}/>
            <LoginName>#{login}</LoginName>
            <AcessButton/>
          </ProfileContainer>
        </ContainerBody>
        <ContainerBody>
          <ProfileContainer>
            <Square/>
            <ProfilePic  src={avatar_url}/>
            <LoginName>#{login}</LoginName>
            <AcessButton/>
          </ProfileContainer>
        </ContainerBody>
        <Footer>
          <Navbar/>
        </Footer>
      </ContainerFollowers>
    )
  }
  else {
    return null;
  }
}