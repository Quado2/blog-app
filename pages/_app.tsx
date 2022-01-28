import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from "@apollo/client/link/context"


const httpLink = createHttpLink({uri:"/api"})


//this lets us set the context at the graphql backend
const authLink = setContext((_,{headers}) =>{
  const token = localStorage.getItem("token");

  return{
    headers:{
      ...headers,
      authorization: token,
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}><Component {...pageProps} /></ApolloProvider> 
}

export default MyApp
