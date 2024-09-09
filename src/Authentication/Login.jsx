import { getSession, loginUser } from '../Sevices/Login';
import React, { useEffect } from 'react';
import "./Login.css";
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function Login() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm();

    // Check for existing session on component mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await getSession();
                console.log("Session result:", session);
                if (session?.role === "authenticated") {
                    toast.success("You are already logged in!");
                    queryClient.invalidateQueries(["Session"]);
                    navigate('/');
                }
            } catch (error) {
                console.error("Error checking session:", error);
            }
        };

        checkSession();
    }, [navigate, queryClient]);

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => loginUser(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries(["Session"]);
            localStorage.setItem('CustomerId', response.user.identities[0].user_id); // Persist session
            navigate("/");
            toast.success("Login successful");
        },
        onError: (error) => {
            console.error("Login error:", error);
            toast.error("Invalid credentials");
        },
    });

    function onSubmit(data) {
        if (data.Password === data.Confirm_Password) {
            mutate(data);
        } else {
            toast.error("Passwords do not match");
        }
    }

    function onError() {
        toast.error("Invalid credentials");
    }

    return (
        <div className='rfc'>
            <form className="form-auth" onSubmit={handleSubmit(onSubmit, onError)}>
                <span className="signup-auth">Sign Up</span>
                <input
                    type="email"
                    placeholder="Email address"
                    className="form--input-auth"
                    {...register("Email", { required: "This field is required" })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form--input-auth"
                    {...register("Password", { required: "This field is required" })}
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    className="form--input-auth"
                    {...register("Confirm_Password", { required: "This field is required" })}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default Login;