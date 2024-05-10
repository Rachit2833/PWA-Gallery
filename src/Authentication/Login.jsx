import React, { useEffect } from 'react';
import "./Login.css";
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getSession, loginUser } from '../Sevices/Login';

function Login() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const session = getSession();
            console.log(session)
            if (session) {
                navigate('/');
                queryClient.invalidateQueries(["Session"])
                toast.success("Welcome")
            }
        };

       
    }, [navigate]);

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => loginUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["Session"]);
            navigate("/");
            toast.success("Login success");
        },
        onError: (error) => {
            console.error("Login error:", error);
            toast.error("Invalid Credentials");
        },
    });

    const { handleSubmit, register } = useForm();

    function onSubmit(data) {
        console.log(data);
        if (data.Password === data.Confirm_Password) {
            mutate(data);
        } else if (data.Password !== data.Confirm_Password) {
            toast.error("Credentials do not match");
        }
    }

    function onError(err) {
        toast.error("Invalid Credentials");
    }

    return (
        <div className='rfc'>
            <form className="form-auth" onSubmit={handleSubmit(onSubmit, onError)}>
                <span className="signup-auth">Sign Up</span>
                <input type="email" placeholder="Email address" className="form--input-auth" {...register("Email", { required: "This field Is required" })}></input>
                <input type="password" placeholder="Password" className="form--input-auth" {...register("Password", { required: "This field iS required" })}></input>
                <input type="password" placeholder="Confirm password" className="form--input-auth" {...register("Confirm_Password", { required: "This field iS required" })}></input>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default Login;
