import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import UserData from "../../components/UserProfile/UserData";

const UserProfile = () => {
    return (
        <div className="min-h-screen flex flex-col">            
            <main className="flex-1 flex items-center justify-center p-4">
                <UserData />
            </main>            
        </div>
    );
}

export default UserProfile;