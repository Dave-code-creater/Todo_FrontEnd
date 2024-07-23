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
            if (JSON.stringify(prevFilteredTasks) !== JSON.stringify(filtered)) {
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

            <CardBody>
                <table className='w-full'>
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th key={index} className='py-3'>
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((task, index) => (
                            <tr key={index}>
                                <td>
                                    <div className='flex items-center gap-3'>
                                        <Avatar
                                            src={task.iconUrl}
                                            alt={task.title}
                                            size='sm'
                                        />
                                        <div>
                                            <Typography variant='sm' color='blue-gray' className='font-normal'>
                                                {task.title}
                                            </Typography>
                                            <Typography color='blue-gray' variant='small' className='font-normal opacity-70'>
                                                {task.description}
                                            </Typography>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <Chip
                                        variant='ghost'
                                        size='sm'
                                        color={task.status === 'in-progress' ? 'red' : 'green'}
                                    >
                                        {task.status === 'in-progress' ? 'Cao' : 'Thấp'}
                                    </Chip>
                                </td>
                                <td>
                                    <Chip
                                        variant='filled'
                                        size='sm'
                                        color={task.status === 'active' ? 'red' : 'green'}
                                    >
                                        {task.status === 'active' ? 'Chưa hoàn thành' : 'Hoàn thành'}
                                    </Chip>
                                </td>
                                <td>
                                    <Typography variant='small' color='blue-gray' className='font-normal'>
                                        {task.deadline}
                                    </Typography>
                                </td>
                                <td>
                                    <div className='flex items-center gap-4'>
                                        <Tooltip content='Cập nhật'>
                                            <IconButton>
                                                <PencilIcon className='h-5 w-5' />
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
