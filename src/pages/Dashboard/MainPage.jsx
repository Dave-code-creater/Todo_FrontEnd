import React from 'react';
import MultiLevelSidebar from '../../components/SideBar';
import { MembersTable } from '../../components/Tables';
import { useSelector } from 'react-redux';


export default function MainPage() {
	const id = useSelector((state) => state.authLogin.user.userId);
	return (
		<div className='main-page'>
			<div className='flex'>
				<MultiLevelSidebar />
				<MembersTable id={id} />
			</div>
		</div>
	);
}
