import React, { useState, useMemo, useEffect } from 'react';
import {
    MagnifyingGlassIcon,
    PencilIcon,
    UserPlusIcon,
} from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
    Checkbox,
} from '@material-tailwind/react';
import { DialogWithForm } from './AddTask';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, toggleTaskStatus } from '../redux/actions/TaskSlice';
import { fetchTasks } from '../redux/actions/TaskSlice';
import { tr } from 'date-fns/locale';

const TABS = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Chưa hoàn thành', value: 'in-progress' },
    { label: 'Hoàn thành', value: 'completed' },
];

const TABLE_HEAD = [
    'Miêu tả chi tiết',
    'Ưu tiên',
    'Hoàn thành',
    'Hạn cuối',
    'Thay đổi',
];

export function MembersTable() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.taskAction.tasks);
    const filter = useSelector((state) => state.taskAction.filter);
    const id = useSelector((state) => state.authLogin.user.userId);


    useEffect(() => {
        dispatch(fetchTasks(id)); // Fetch tasks on component mount
    }, [dispatch,tasks]);

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'in-progress':
                return tasks.filter(task => task.status === 'in-progress');
            case 'completed':
                return tasks.filter(task => task.status === 'completed');
            default:
                return tasks;
        }
    }, [filter, tasks]);

    const handleToggleTaskStatus = (taskId, currentStatus) => {
        const newStatus = currentStatus === 'completed' ? 'in-progress' : 'completed';

        dispatch(toggleTaskStatus({ id: taskId, newStatus })); // Dispatch action to update task status in Redux store and DB
        return <Checkbox checked={newStatus === 'completed'} />;
    };

    const [isDialogOpenAddTask, setIsDialogOpenAddTask] = useState(false);

    const handleDialogOpen = () => {
        setIsDialogOpenAddTask(prev => !prev);
    };

    return (
        <Card className='w-full'>
            <CardHeader floated={false} shadow={false} className='rounded-none'>
                <div className='mb-8 flex items-center justify-between gap-8'>
                    <div>
                        <Typography variant='h5' color='blue-gray'>
                            Danh sách việc làm
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
                        <DialogWithForm
                            open={isDialogOpenAddTask}
                            handleOpen={handleDialogOpen}
                        />
                    </div>
                </div>
                <div className='flex flex-col items-center justify-between gap-8 md:flex-row'>
                    <Tabs value={filter} className='w-full'>
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab
                                    key={value}
                                    value={value}
                                    onClick={() => dispatch(setFilter(value))} // Update filter via dispatch
                                    className='w-50'
                                >
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className='w-full md:w-72'>
                        <Input
                            label='Tìm kiếm'
                            icon={<MagnifyingGlassIcon className='h-5 w-5' />}
                        />
                    </div>
                </div>
            </CardHeader>

            <CardBody className='overflow-hidden px-0'>
                <table className='mt-4 w-full min-w-max table-auto text-left overflow-hidden'>
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={index}
                                    className='border-blue-gray-100 bg-blue-gray-50/50 p-4'
                                >
                                    <Typography
                                        variant='small'
                                        color='blue-gray'
                                        className='font-normal leading-none opacity-70'
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map(({ _id, iconUrl, title, description, type, status, deadline }) => {

                            return (
                                <tr key={_id}>
                                <td className='p-4'>
                                    <div className='flex items-center gap-3'>
                                        <Avatar
                                            src={iconUrl}
                                            size='sm'
                                        />
                                        <div>
                                            <Typography
                                                variant='sm'
                                                color='blue-gray'
                                                className='font-normal'
                                            >
                                                {title}
                                            </Typography>
                                            <Typography
                                                color='blue-gray'
                                                variant='small'
                                                className='font-normal opacity-70'
                                            >
                                                {description}
                                            </Typography>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className='w-max'>
                                        <Typography
                                            variant='small'
                                            color='blue-gray'
                                            className='font-normal'
                                        >
                                            {type === 'emergency'
                                                ? 'Quan trọng'
                                                : 'Bình thường'}
                                        </Typography>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <Tooltip content={status === 'completed' ? 'Đã hoàn thành' : 'Đánh dấu là hoàn thành'}>
                                        <IconButton
                                            variant="text"
                                            onClick={() => handleToggleTaskStatus(_id, status)}
                                        >
                                            <Checkbox checked={status === 'completed'} />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {format(new Date(deadline), 'dd/MM/yyyy', { locale: tr })}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Tooltip content="Chỉnh sửa công việc">
                                        <IconButton variant="text" color="blue-gray">
                                            <PencilIcon className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                            );
                        })}  
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}
