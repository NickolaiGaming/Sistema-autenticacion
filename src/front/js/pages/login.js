import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	if (!!store.user) return <Navigate to="/" replace />

	return (
		<>
			<form onSubmit={actions.handleSubmitLogin} className='w-50 mx-auto py-5 my-5'>
				<div className="form-group mb-3">
					<label htmlFor="email" className="form-label">Email</label>
					<input className='form-control' type="email" name="email" id="email" placeholder='Insert Email' value={store.email} onChange={actions.handleChange} />
				</div>
				<div className="form-group mb-3">
					<label htmlFor="password" className="form-label">Password</label>
					<input className='form-control' type="password" name="password" id="password" placeholder='Insert password' value={store.password} onChange={actions.handleChange} />
				</div>
				<button className="btn btn-primary btn-sm w-100">Login</button>
			</form>
		</>
	);
};