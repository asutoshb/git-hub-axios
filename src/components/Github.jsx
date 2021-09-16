import React from 'react';
import {fetchUsers} from './fetchUsers'
import '../App.css'

const Github = () => {
    
    const [query, setQuery] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    
    React.useEffect(() => {
         fetchUsers("masai")
        .then(res=>{
            setUsers(res.data.items);
        })
        .catch(err=>{
            setIsError(true)
        })
        .finally(()=>{
            setIsLoading(false);
        })
    },[])
    
    const handleSearch = () => {
        setIsLoading(true);
        setIsError(false);
        fetchUsers(query)
        .then(res=>{
            setUsers(res.data.items);
        })
        .catch(err=>{
            setIsError(true)
        })
        .finally(()=>{
            setIsLoading(false);
        })
    };

   return (<div  className="main">
            <h1>Github</h1>
            <div>
                <input 
                value={query} 
                onChange={((e)=> setQuery(e.target.value))} placeholder="search" />
                <button disabled={isLoading}  
                onClick={handleSearch}>
                    {" "}
                    {isLoading ? "Loading" : "SEARCH"}
                </button>
            </div>

        {isError ? "please fill in text" : null}

            <div>
                {users ?.map((item)=>(
                    <div className="card" key={item.id}>{item.login}</div>
                ))}
            </div>
            
        </div>)
}

export {Github};