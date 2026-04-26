import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

const Profile = ({user}) => {
    const {CheckAuthUser ,isCheckingAuth} = useAuthStore(); 

    console.log(user)
    

   
}

export default Profile;
