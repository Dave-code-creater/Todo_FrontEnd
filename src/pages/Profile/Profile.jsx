import Account1 from "../../components/UpdateProfile";
import MultiLevelSidebar from "../../components/SideBar";

export default function MainPage() {
    return (
        <div className='main-page'>
            <div className='flex'>
                <MultiLevelSidebar />
                <Account1 />
            </div>
        </div>
    );
}