import { useState } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarDropdown from '../components/calendarDropdown.jsx';

function Register() {
	const navigate = useNavigate();

	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		birthDate: null,
		password: '',
		role: '',
		confirmPassword: ''
	})

	const [ error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));

		// Real-time password validation
		if (name === "password") {
			const passwordChecks = passwordRules(value).filter(rule => rule !== true);
			if (passwordChecks.length > 0) {
				setError(passwordChecks[0]);
				return;
			} else {
				setError('');
			}
			if (formData.confirmPassword) {
				const confirmPasswordChecks = confirmPasswordRules(value, formData.confirmPassword).filter(rule => rule !== true);
				if (confirmPasswordChecks.length > 0) {
					setError(confirmPasswordChecks[0]);
					return;
				}
			}
		}

		if (name === "confirmPassword") {
			const confirmPasswordChecks = confirmPasswordRules(formData.password, value).filter(rule => rule !== true);
			if (confirmPasswordChecks.length > 0) {
				setError(confirmPasswordChecks[0]);
				return;
			} else {
				setError('');
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (error) return;

		const formattedBirthDate = formData.birthDate ? formData.birthDate.toISOString().split('T')[0] : null;

		const payload = {
			...formData,
			birthDate: formattedBirthDate,
		};

		const res = await fetch('/api/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		const data = await res.json();
		if (res.ok) {
			navigate('/login');
		} else {
			setError(data.error || 'Registration failed');
		}
	};

	const passwordRules = (password) => [
		!!password || 'Password field is required',
		password.length >= 8 || 'Your password should contain at least 8 characters',
		/[A-Z]/.test(password) || 'Your password should contain at least an uppercase',
		/[a-z]/.test(password) || 'Your password should contain at least a lowercase',
		/[0-9]/.test(password) || 'Your password should contain at least a digit',
		/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) || 'Your password should contain at least a special character',
	];

	const confirmPasswordRules = (password, confirmPassword) => [
		!!confirmPassword || 'You need to confirm your password',
		confirmPassword === password || 'The passwords do not match',
	];

	return (
		<div className="registerDiv">
		<h2>Register</h2>
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="name"
				placeholder="Name"
				value={formData.name}
				onChange={handleChange}
			/><br/>
			<CalendarDropdown
				selectedDate={formData.birthDate}
				onChange={(date) => setFormData(prev => ({ ...prev, birthDate: date }))}
			/><br/>
			<input
				type="email"
				name="email"
				placeholder="Email"
				value={formData.email}
				onChange={handleChange}
			/><br/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				value={formData.password}
				onChange={handleChange}
			/><br/>
			<input
				type="password"
				name="confirmPassword"
				placeholder="Confirm Password"
				value={formData.confirmPassword}
				onChange={handleChange}
			/><br/>
			<input
				type="text"
				name="role"
				placeholder="Role (user/admin)"
				value={formData.role}
				onChange={handleChange}
			/><br/>
			<button type="submit">Register</button>
			{error && <p className="error">{error}</p>}
		</form>
		</div>
	);
}

export default Register;