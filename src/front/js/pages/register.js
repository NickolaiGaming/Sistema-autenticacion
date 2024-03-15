import React, { useContext } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import { Context } from "../store/appContext";


const Register = () => {
    const { store, actions } = useContext(Context)
    if (!!store.user) return <Navigate to="/" replace />
    return (
        <>
            <form onSubmit={actions.handleSubmitRegister} className='w-50 mx-auto py-5 my-5'>
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input className='form-control' type="text" name="name" id="name" placeholder='Insert name' value={store.name} onChange={actions.handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input className='form-control' type="email" name="email" id="email" placeholder='Insert Email' value={store.email} onChange={actions.handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input className='form-control' type="password" name="password" id="password" placeholder='Insert password' value={store.password} onChange={actions.handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password_confirm" className="form-label">Confirm Password</label>
                    <input className='form-control' type="password" name="password_confirm" id="password_confirm" placeholder='Insert password' value={store.password_confirm} onChange={actions.handleChange} />
                </div>
                <button className="btn btn-primary btn-sm w-100">Register</button>
            </form>
        </>
    )
}

export default Register