import React from 'react';
import MultiLevelSidebar from '../../components/SideBar';
import { MembersTable } from '../../components/Tables';

export default function MainPage() {
	return (
		<div className='main-page'>
			<div className='flex'>
				<MultiLevelSidebar />
				<MembersTable />
			</div>
		</div>
	);
}
