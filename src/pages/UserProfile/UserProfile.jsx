import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { getUserProfile } from "../../services/userService";
import UserData from "./Components/UserData";

const UserProfile= () =>
{
    return (
          <div className="min-h-screen flex flex-col">  
            <main className="flex-1 flex items-center justify-center p-4">  
                <UserData />
            </main>   
            </div>
    )
}
   

export default UserProfile;