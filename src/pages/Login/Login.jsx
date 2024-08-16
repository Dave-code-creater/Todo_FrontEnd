import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/AuthSlice';
import { NavbarDefault } from '../../components/Navbar';
import { SimpleFooter } from '../../components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { fetchTasks } from '../../redux/actions/TaskSlice'; // Import the fetchTasks action

export default function SimpleRegistrationForm() {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { status, loading, error } = useSelector((state) => state.authLogin);
	const errorCode = useSelector((state) => state.authLogin.errorCode);
	useEffect(() => {
		if (errorCode) {
			switch (errorCode) {
				case 400:
					toast.error('Yêu cầu không hợp lệ.');
					break;
				case 401:
					toast.error('Tài khoản hoặc mật khẩu không đúng.');
					break;
				case 403:
					toast.error('Không có quyền truy cập.');
					break;
				case 404:
					toast.error('Tài khoản không tồn tại.');
					break;
				case 500:
					toast.error('Lỗi máy chủ.');
					break;
				default:
					toast.error('Đã có lỗi xảy ra.');
					break;
			}
		}
	}, [errorCode]); 



	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(login({ email, password }));
		if (status === 'succeeded') {
			navigate('/dashboard');
			dispatch(fetchTasks());
			toast.success('Login successful');
			setEmail('');
			setPassword('');
		}
	};

	return (
		<div>
			<NavbarDefault />
			<ToastContainer />
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<img
						className='mx-auto h-10 w-auto'
						src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
						alt='Your Company'
					/>
					<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
						Sign in to your account
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form
						className='space-y-6'
						onSubmit={handleSubmit}
						method='POST'>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium leading-6 text-gray-900'>
								Email address
							</label>
							<div className='mt-2'>
								<input
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='block text-sm font-medium leading-6 text-gray-900'>
									Password
								</label>
								<div className='text-sm'>
									<a
										href='#'
										className='font-semibold text-indigo-600 hover:text-indigo-500'>
										Forgot password?
									</a>
								</div>
							</div>
							<div className='mt-2'>
								<input
									id='password'
									name='password'
									type='password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									autoComplete='current-password'
									required
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
			<SimpleFooter />
		</div>
	);
}
