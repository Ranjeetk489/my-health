import { useState, createContext, useContext } from "react";



const OauthContext = createContext(null);

export function OauthProvider({children}){
    const [isOauth, setOauthState] = useState();
    return (
        <OauthContext.Provider value ={{isOauth, setOauthState}}>
        {children}
        </OauthContext.Provider>
    )
}
export function useOauthContext() {
    const {isOauth, setOauthState} = useContext(OauthContext)
    return [isOauth, setOauthState]
}