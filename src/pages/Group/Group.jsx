
import MultiLevelSidebar from "../../components/SideBar";
import {TabsWithIcon} from "../../components/TabsCompany";
export default function MainPage() {
    return (
        <div className='main-page'>
            <div className='flex'>
                <MultiLevelSidebar />
                <div className='md:container md:mx-auto pt-6 overflow-y-hidden'>
                    <TabsWithIcon />
                    
                </div>
            </div>
        </div>
    );
}