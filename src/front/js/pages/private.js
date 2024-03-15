import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"

const Private = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        if(store?.access_token !== null) actions.privateRoute()
    }, [])
    return (
        <h5>Cuenta</h5>
    )
}

export default Private