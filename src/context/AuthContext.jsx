import { createContext, useContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    // const crsf = () => axios.get('/sanctum/crsf-cookie')


    const getUser = async () =>{
        const {data} = await axios.get('/api/user');
        setUser(data);
    }

    const login = async (...data) => {
        // await crsf();
        try {
            await axios.post('/login', ...data);
            await getUser();
            navigate('/PostFeed');
            setError('');
        } catch (error) {
            console.error(error);
            setError(error.response.data.message);
        }
    }


    const register = async ({ ...data}) => {
        // await crsf();
        try {
            await axios.post('/register', data);
            await getUser();
            navigate('/');
            setError('');
        } catch (error) {
            console.error(error);
            console.log(error.response.data.message);
            setError(error.response.data.message);
        }
    }
    
    const logout = () =>{
        axios.post('/logout').then(() =>{
            setUser(null);
        })
    }

    return <AuthContext.Provider value={{user, error, getUser, login, register, logout}}>
        {children}
    </AuthContext.Provider>



}

export default function useAuthContext(){
    return useContext(AuthContext);
}