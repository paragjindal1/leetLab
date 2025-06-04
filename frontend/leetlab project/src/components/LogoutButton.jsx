import React from 'react';

import { useAuthStore } from '../store/authStore';

const LogoutButton = ({children}) => {

    const {Logout} = useAuthStore();

    async function onLogout(){
        await Logout();
    }
    return (
        <button className="btn btn-primary" onClick={onLogout}> 
            {children}
        </button>
    );
}

export default LogoutButton;
