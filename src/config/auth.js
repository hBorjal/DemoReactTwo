import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function Auth(props) {
    const authData = useSelector(state => state.Auth);
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const logIn = (callBack, isAuth) => {
        if (isAuth) {
            setIsAuthenticated(isAuth)
            callBack();
        }
    }

    const logOut = (callBack) => {
        setIsAuthenticated(false);
        callBack();
    }

    const isAuthed = () => {
        const auth = Object.keys(authData).length === 0  ? isAuthenticated : authData.item.IsAuthenticated;
        return auth;
    }

    return (props.children({ logIn, logOut, isAuthed, isAuthenticated}));
}