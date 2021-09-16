import React,{useState} from 'react';
import {loginUser} from './loginUser'
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [token, setToken] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError(false);
        loginUser({email, password})
        .then(res=>{
            setIsAuth(true);
            setToken(res.data.token);
           // setIsLoading(false);
        })
        .catch(err => {
            setIsError(true);
        })
        .finally(() => {
            setIsLoading(false);
        });

        if(isAuth)
        {
            return (
                <div>
                    <h1>Welcome to dashboard</h1>
                    <h3>Token : {token}</h3>
                </div>
            );
        }
    }
    
    return (<>
            <form onSubmit={handleSubmit}>
                {isError && "something went wrong"}
                <div>
                    <label>
                        Email:{" "}<input type="email" onChange={e=>setEmail(e.target.value)} placeholder="email" />
                    </label>
                </div>

                <div>
                    <label>
                        Password:{" "}<input type="password" onChange={e=>setPassword(e.target.value)} placeholder="password" />
                    </label>
                </div>

                <div>
                    <input type="submit" />
                </div>
            </form>

            {isAuth ? <div>
                    <h1>Welcome to dashboard</h1>
                    <h3>Token : {token}</h3>
                </div> : ""}

                </>
    )
}

export {Login}