import { useUser } from '@/context/UserContext';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { toast } from 'sonner';
import { IoIosArrowDropup } from "react-icons/io";
import { logOut } from '@/apis/users/logout';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/components/ui/menubar';

const Profile = () => {
    const { user } = useUser();

    const handleEditProfile = () => {
        try {
            console.log("Edit profile")

        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    const handleDeleteAccount = () => {
        try {
            console.log("Delete account")
        } catch (error) {
            toast.error('Failed to delete account');
        }
    };

    const handleLogout = () => {
        try {
            logOut();
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    return (
        <div className="flex items-center justify-between gap-2 border  p-3 rounded-xl shadow-md">
            <div className="flex items-center">
                <Avatar className="h-10 p-3 mr-2 rounded-full border border-foreground bg-secondary">
                    <AvatarFallback>
                        {user?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="font-semibold">{user?.name}</div>
            </div>
            <div>
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger><IoIosArrowDropup className='text-lg'/></MenubarTrigger>
                        <MenubarContent>

                            <MenubarItem onClick={handleEditProfile}>Edit Profile</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem onClick={handleDeleteAccount}>Delete</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem onClick={handleLogout}>Log Out</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>

            </div>
        </div>
    );
};

export default Profile;
