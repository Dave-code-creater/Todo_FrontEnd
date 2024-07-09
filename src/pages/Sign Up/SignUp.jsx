import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/AuthSlice';
import { NavbarDefault } from '../../components/Navbar';
import { SimpleFooter } from '../../components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SimpleRegistrationForm() {
	const { loading, error } = useSelector((state) => state.authLogin);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

	useEffect(() => {
		if (loading === 'succeeded') {
			navigate('/dashboard');
		} else if (error) {
			if (error.includes('409')) {
				toast.error('Tài khoản đã tồn tại');
			} else toast.error(`Registration failed: ${error}`);
		}
	}, [loading, error, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await dispatch(
			register({ email, password, username })
		);
		localStorage.setItem('accessToken', response.payload.accessToken);
		localStorage.setItem('refreshToken', response.payload.refreshToken);
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
						Create an account
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form
						className='space-y-6'
						onSubmit={handleSubmit}
						method='POST'>
						<div>
							<label
								htmlFor='text'
								className='block text-sm font-medium leading-6 text-gray-900'>
								Username
							</label>
							<div className='mt-2'>
								<input
									id='text'
									name='text'
									type='text'
									autoComplete='text'
									required
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>

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
							</div>
							<div className='mt-2'>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
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
