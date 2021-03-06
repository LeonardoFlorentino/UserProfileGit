import { ReactNode } from "react";
export interface dataTypes {
    user?: Object,
    id?: string,
    name?: string,
    login?: string,
    avatar_url?: string,
    email?: string,
    location?: string,
    followers?: number,
    following?: number,
    public_repos?: number,
    bio?: string,
    node_id?: string,
    description?:string,
    stargazers_count?: number,
    isLogged?: boolean
}

interface userProps {
    setUserName: (value:  string | ((prevState:  string) =>  string)) => void,
    userName: string,
    fetchUserData: (value1: string, value2: boolean) => Promise<number>,
    setUser: (value: dataTypes | ((prevState:  dataTypes) =>  dataTypes)) => void,
}

export interface routerProps extends userProps {
    user: dataTypes,
  }

export interface dataReposTypes {
    name?: string,
    description?: string,
    stargazers_count?: string
}

export interface RouteParams {
    mainUserName: string,
    pageType: string,
    subordinateUserName: string
}

export interface profileProps extends userProps{
    user: dataTypes,
}

export interface pageProps {
  user: dataTypes,
  fetchUserData: (value1: string, value2: boolean) => Promise<number>,
  userName: string,
}


export interface paginatorProps {
    typePage: string,
    showData: (value: dataTypes) => ReactNode,
    numOfElements: number | undefined,
    // fetchUserData: (value1: string, value2: boolean) => Promise<number>,
    userName: string,
    per_page?: number,
  }