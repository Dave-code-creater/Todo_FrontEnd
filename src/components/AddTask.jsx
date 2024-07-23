import React, { useState } from 'react';
import {
	Button,
	Dialog,
	Card,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Checkbox,
} from '@material-tailwind/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addNewTask } from '../redux/actions/TaskSlice';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';

export function DialogWithForm({ open, handleOpen }) {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState('in-progress');
	const [type, setType] = useState('normal');
	const [deadline, setDeadline] = useState(new Date());
	const id = jwtDecode(localStorage.getItem('refreshToken')).userId;
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await dispatch(
			addNewTask({
				title,
				description,
				status,
				type,
				deadline,
				userId: id,
			})
		);

		console.log(title, description, status, type, deadline, id);

		if (response) {
			handleOpen();
		}

		setTitle('');
		setDescription('');
		setStatus('in-progress');
		setType('normal');
		setDeadline(new Date());
	};

	return (
		<Dialog
			size='xs'
			open={open}
			handler={handleOpen}
			className='bg-transparent shadow-none'>
			<Card className='mx-auto w-full max-w-[30rem]'>
				<CardBody className='flex flex-col gap-4  overflow-y-auto'>
					<Typography
						variant='h4'
						color='blue-gray'>
						Thêm công việc
					</Typography>
					<Typography
						className='mb-3 font-normal'
						variant='paragraph'
						color='gray'>
						Hãy điền thông tin công việc của bạn vào form dưới đây
					</Typography>
					<form
						className='space-y-4'
						method='POST'
						onSubmit={handleSubmit}>
						<div className='flex flex-col gap-4'>
							<label
								htmlFor='title'
								className='block text-sm font-medium leading-6 text-gray-900'>
								Title
							</label>
							<div className='mt-2'>
								<Input
									type='text'
									color='lightBlue'
									placeholder='Title'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
							<label
								htmlFor='description'
								className='block text-sm font-medium leading-6 text-gray-900'>
								Description
							</label>
							<div className='mt-2'>
								<Input
									type='text'
									color='lightBlue'
									placeholder='Description'
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
								/>
							</div>
							<label
								htmlFor='deadline'
								className='block text-sm font-medium leading-6 text-gray-900'>
								Deadline
							</label>

							<div className='mt-2 flex justify-center'>
								<DatePicker
									selected={deadline}
									onChange={(date) => setDeadline(date)}
									dateFormat='yyyy-MM-dd'
									className='input'
									PopupWidth='300px'
								/>
							</div>

							<div className='flex flex-row gap-4'>
								<label
									htmlFor='status'
									className='block text-sm font-medium leading-6 text-gray-900 w-11'>
									Status
								</label>
								<div>
									<select
										value={status}
										onChange={(e) =>
											setStatus(e.target.value)
										}
										className='input pe-12 flex justify-start '>
										<option value='completed'>
											Hoàn thành
										</option>
										<option value='in-progress'>
											Chưa hoàn thành
										</option>
									</select>
								</div>

								<label
									htmlFor='type'
									className='block text-sm font-medium leading-6 text-gray-900 w-11'>
									Type
								</label>

								<div>
									<select
										value={type}
										onChange={(e) =>
											setType(e.target.value)
										}
										className='input pe-12 flex justify-start'>
										<option value='emergency'>
											Khẩn cấp
										</option>
										<option value='normal'>
											Bình thường
										</option>
									</select>
								</div>
							</div>
						</div>
						<CardFooter className='pt-0'>
							<Button
								variant='gradient'
								type='submit'
								fullWidth>
								Thêm
							</Button>
						</CardFooter>
					</form>
				</CardBody>
			</Card>
		</Dialog>
	);
}
