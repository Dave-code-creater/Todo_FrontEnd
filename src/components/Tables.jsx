import React, { useState, useEffect } from 'react';
import {
	MagnifyingGlassIcon,
	PencilIcon,
	UserPlusIcon,
} from '@heroicons/react/24/solid';

import {
	Card,
	CardHeader,
	Input,
	Typography,
	Button,
	CardBody,
	Chip,
	Tabs,
	TabsHeader,
	Tab,
	Avatar,
	IconButton,
	Tooltip,
} from '@material-tailwind/react';
import useTasks from './TaskTable'; // Import the custom hook
import { DialogWithForm } from './AddTask';

const TABS = [
	{ label: 'Tất cả', value: 'all' },
	{ label: 'Chưa hoàn thành', value: 'uncompleted' },
	{ label: 'Hoàn thành', value: 'completed' },
];

const TABLE_HEAD = [
	'Miêu tả chi tiết',
	'Ưu Tiên',
	'Hoàn Thành',
	'Hạn Cuối',
	'Thay Đổi',
];

export function MembersTable() {
	const tasks = useTasks(); // Use the custom hook to get tasks
	const [filter, setFilter] = useState('all');
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleDialogOpen = () => {
		setIsDialogOpen((prev) => !prev);
	};

	useEffect(() => {
		let filtered = [];
		if (filter === 'all') {
			filtered = tasks;
		} else if (filter === 'uncompleted') {
			filtered = tasks.filter((task) => task.status === 'active');
		} else {
			filtered = tasks.filter((task) => task.status === 'inactive');
		}

		// Only update state if filteredTasks has changed
		setFilteredTasks((prevFilteredTasks) => {
			if (
				JSON.stringify(prevFilteredTasks) !== JSON.stringify(filtered)
			) {
				return filtered;
			}
			return prevFilteredTasks;
		});
	}, [filter, tasks]);
	return (
		<Card className='w-full'>
			<CardHeader floated={false} shadow={false} className='rounded-none'>
				<div className='mb-8 flex items-center justify-between gap-8'>
					<div>
						<Typography variant='h5' color='blue-gray'>
							Danh sách việc làm
						</Typography>
						<Typography color='gray' className='mt-1 font-normal'>
							Danh sách chi tiết về công việc bạn cần hoàn thành
						</Typography>
					</div>
					<div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
						<Button
							className='flex items-center gap-3'
							size='sm'
							variant='gradient'
							onClick={handleDialogOpen}
						>
							<UserPlusIcon strokeWidth={2} className='h-4 w-4' />
							Thêm công việc
						</Button>
						<DialogWithForm open={isDialogOpen} handleOpen={handleDialogOpen} />
					</div>
				</div>
				<div className='flex flex-col items-center justify-between gap-8 md:flex-row'>
					<Tabs value={filter} className='w-full'>
						<TabsHeader>
							{TABS.map(({ label, value }) => (
								<Tab
									key={value}
									value={value}
									onClick={() => {
										setFilter(value);
										if (value === 'all') {
											setFilteredTasks(tasks);
										} else {
											setFilteredTasks(
												tasks.filter((task) => task.status === value)
											);
										}
									}}
									className='w-50'
								>
									&nbsp;&nbsp;{label}&nbsp;&nbsp;
								</Tab>
							))}
						</TabsHeader>
					</Tabs>
					<div className='w-full md:w-72'>
						<Input
							label='Search'
							icon={<MagnifyingGlassIcon className='h-5 w-5' />}
						/>
					</div>
				</div>
			</CardHeader>
			<CardBody className='overflow-scroll px-0'>
				<table className='mt-4 w-full min-w-max table-auto text-left overflow-y-scroll'>
					<thead>
						<tr>
							{TABLE_HEAD.map((head) => (
								<th key={head} className=' border-blue-gray-100 bg-blue-gray-50/50 p-4'>
									<Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
										{head}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{filteredTasks.map((task) => (
							<tr key={task.id}>
								<td className='p-4'>
									<div className='flex items-center gap-3'>
										<Avatar src={task.iconUrl} color='blue' size='sm' />
										<div className='flex flex-col'>
											<Typography variant='small' color='blue-gray' className='font-normal'>
												{task.title}
											</Typography>
											<Typography variant='small' color='blue-gray' className='font-normal opacity-70'>
												{task.description}
											</Typography>
										</div>
									</div>
								</td>
								<td className='p-4'>
									<div className='flex flex-col'>
										<Typography variant='small' color='blue-gray' className='font-normal'>
											{task.type === 'normal' ? 'Bình thường' : 'Quan trọng'}
										</Typography>
									</div>
								</td>
								<td className='p-4'>
									<div className='w-max'>
										<Chip
											variant='ghost'
											size='sm'
											value={task.status === 'active' ? 'Chưa hoàn thành' : 'Hoàn Thành'}
											color={task.status === 'active' ? 'red' : 'green'}
										/>
									</div>
								</td>
								<td className='p-4'>
									<Typography variant='body' color='blue-gray'>
										{new Date(task.deadline).toLocaleDateString()}
									</Typography>
								</td>
								<td className='p-4'>
									<div className='flex items-center gap-4'>
										<Tooltip content="Chỉnh Sửa">
											<IconButton variant="text">
												<PencilIcon className="h-4 w-4" />
											</IconButton>
										</Tooltip>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</CardBody>
		</Card>
	);
}
