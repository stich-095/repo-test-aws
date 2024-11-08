"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axiosInstance from "@/utils/axios_instance"

export default function Login() {

    let router = useRouter()

    let [user, setUser] = useState()
    let [password, setPassword] = useState()

    let handleUser = (event) => {
        setUser(event.target.value)
    }

    let handlePassword = (event) => {
        setPassword(event.target.value)
    }

    let HandleloginUser = async () => {
        await login(user, password)
    }

    let HandleloginBussine = async () => {
        await loginBussine(user, password)
    }

    const login = async (user, password) => {
        console.log(user, password);

        try {
            const respuesta = await axiosInstance.post(`/api_token/get_token/`, {
                username: user,
                password: password
            });
            const dataLogin = respuesta.data;
            localStorage.setItem('authTokens', JSON.stringify(dataLogin));
            console.log('respuesta', respuesta.status)
            {/* if (respuesta.status === 200) {
                localStorage.setItem('authTokens', JSON.stringify(dataLogin));
                let response = await axiosInstance.get(`/preference_front/processofsale/`, {
                    headers: {
                        Authorization: `Bearer ${dataLogin.access}`
                    }
                })
                if (true) {
                    const bussine_name = response.data.bussine_names
                    router.push(`${"bussine/" + bussine_name + "/my_dashboards"}`)
                }

                //router.push(`my_dashboards`)
            } else {
                console.log('Usuario o contraseña incorrectos')
            } */}
            
        } catch (error) {
            // Handle login errors here
            console.error("Error during login:", error);
            // Additional error handling options:
            // - Display an error message to the user (consider user-friendliness)
            // - Redirect to a login error page
            // - Optionally, retry the login request with backoff (advanced)
        }
    };

    const loginBussine = async (user, password) => {
        console.log(user, password);

        try {
            const respuesta = await axiosInstance.post(`/api/token/`, {
                username: user,
                password: password
            });
            const dataLogin = respuesta.data;
            localStorage.setItem('authTokens', JSON.stringify(dataLogin));
            console.log('respuesta', respuesta.status)
            router.push(`for_bussine/dashboard/`)
            
        } catch (error) {
            // Handle login errors here
            console.error("Error during login:", error);
            // Additional error handling options:
            // - Display an error message to the user (consider user-friendliness)
            // - Redirect to a login error page
            // - Optionally, retry the login request with backoff (advanced)
        }
    };


    


    return (
        <div>
            
            <div>
            <h1>user</h1>
                <input onChange={(event) => handleUser(event)} type="text" name="username" placeholder="Enter Username" />
                <input onChange={(event) => handlePassword(event)} type="password" name="password" placeholder="Enter Password" />
                <button onClick={() => HandleloginUser()} >Login</button>
            </div>
            <div>
            <h1>bussine</h1>
                <input onChange={(event) => handleUser(event)} type="text" name="username" placeholder="Enter Username" />
                <input onChange={(event) => handlePassword(event)} type="password" name="password" placeholder="Enter Password" />
                <button onClick={() => HandleloginBussine()} >Login</button>
            </div>
        </div>
    )

}
