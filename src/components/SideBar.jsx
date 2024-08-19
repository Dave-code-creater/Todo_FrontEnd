import React from 'react';
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,

} from '@material-tailwind/react';
import {
	PresentationChartBarIcon,
	ShoppingBagIcon,
	UserCircleIcon,
	Cog6ToothIcon,
	InboxIcon,
	PowerIcon,
} from '@heroicons/react/24/solid';
import { logout } from '../redux/actions/AuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Account1 from './UpdateProfile';
export default function MultiLevelSidebar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(logout());
		navigate('/');
	};

	const handleProfile = () => {
		navigate('/profile');
	}
	const handleNavbar = () => {
		navigate('/dashboard');
	}
	const handleGroup = () => {
		navigate('/group');
	}

	return (
		<Card className='h-[calc(100vh)] max-w-[20rem] p-10 sticky top-0'>
			<div className='mb-2 flex items-center gap-4 p-4'>
				<img
					src='https://docs.material-tailwind.com/img/logo-ct-dark.png'
					alt='brand'
					className='h-8 w-8'
				/>
				<Typography
					variant='h5'
					color='blue-gray'>
					Thanh tìm kiếm
				</Typography>
			</div>

			<List className='mb-4'>
				<ListItem className='mb-2'>
					<ListItemPrefix>
						<PresentationChartBarIcon className='h-5 w-5' />
					</ListItemPrefix>
					<Typography
						variant='button'
						onClick={() => handleNavbar()}>
						Trang chủ
					</Typography>
				</ListItem>

				<ListItem className='mb-2'>
					<ListItemPrefix>
						<ShoppingBagIcon className='h-5 w-5' />
					</ListItemPrefix>
					<Typography
						variant='button'
						onClick={() => alert('Products')}>
						Kế hoạch làm việc
					</Typography>
				</ListItem>

				<ListItem className='mb-2'>
					<ListItemPrefix>
						<UserCircleIcon className='h-5 w-5' />
					</ListItemPrefix>
					<Typography
						variant='button'
						onClick={() => handleProfile()}>
						Trang cá nhân
					</Typography>
				</ListItem>

				<ListItem className='mb-2'>
					<ListItemPrefix>
						<Cog6ToothIcon className='h-5 w-5' />
					</ListItemPrefix>
					<Typography
						variant='button'
						onClick={() => handleGroup()}>
						Tạo nhóm
					</Typography>
				</ListItem>

				<ListItem className='mb-2'>
					<ListItemPrefix>
						<InboxIcon className='h-5 w-5' />
					</ListItemPrefix>
					<Typography
						variant='button'
						onClick={() => alert('Inbox')}>
						Thông báo
					</Typography>
				</ListItem>

				<ListItem className='mb-2'>
					<ListItemPrefix>
						<PowerIcon className='h-5 w-5' />
					</ListItemPrefix>
					<Typography
						variant='button'
						onClick={() => handleLogout()}>
						Đăng xuất
					</Typography>
				</ListItem>
			</List>
		</Card>
	);
}
