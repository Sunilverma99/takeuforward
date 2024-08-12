import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function SignUp() {
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "" || userName === "") {
      toast.error("Please fill all the fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/auth/signUp', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          userName
        })
      });
      const data = await res.json();
      if (res.status === 201) {
        toast.success("You are registered successfully");
        setEmail('');
        setPassword('');
        setuserName('');
        navigate('/sign-in');
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex py-20 w-full justify-center items-center bg-zinc-100">
      <div className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl sm:flex">
        <div
          className="w-full rounded-2xl bg-gray-400 bg-cover bg-center m-10 text-white sm:w-2/5"
          style={{ backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAh1BMVEX///83NzftGyQwMDAnJyfydXjtChg0NDSzs7N0dHQkJCRLS0srKyvAwMD09PSbm5sAAABsbGzzbHDj4+NiYmLtMTdYWFh8fHzR0dE8PDwfHx9EREQNDQ0ZGRkTExO5ubna2tqMjIyEhITtKC/1nJ7sAAerq6vKysqioqJkZGSUlJTi4uLzfX6WKSKzAAACmElEQVR4nO3b3XKiMABAYVxpqUAhlG7ESJDaVq32/Z9vQXdHCPYiO/RHON+NzsRk4AxKhk4dBwAAAAAAAAAAAAAAAAAAAAAAAAAAAMBHXh4uevnu4/qRbl5vL3h9+O7j+pFubn9dcHvz3cf1IxHLArEsEMvClcZKy6j/ReNk1pVszx+4zlhzJZb9rzpzp13q7vyBq4yVCqWm/S87m0663GuP5QTKF4feVx1orLhQYf+rDjJW9uRp+Qk/8EOMtRGF8lXa/8IDjBXlfkXc97/yAGM9FXUsFfS/8vBibY8XVnVp9b/08GJNlD7GKvpfenixYrE+1tLWM1d3Xa3bxPBirfzTF1FPLDcP0cJ3TXnrNjHAWItSHH/g12pjtX2IAq9bYuixwrSOpRMnlWJnMXGMsdbKqWMVT9X7zOabOMZYUpxi7W0njjFWtHWkqr6Gb9YTRxirMq/3DqK0nDXSWIGqNqZ6ZjlrpLFytVwXvrDdZ40yVimqW2GiC8tLa5yxpM5LZ5VXOy1DPO9o3DNHGWsl8rh6cXXnIU3S+etM+HgeHWUsVy/ql0B3HpYmnZP1Rh7r/nRhObs8Nx+WEsuU6Px4GzyIzuaBWIZUib9HPykejTFiGfb5v+fJdyLYtseIZVhqsTm9y4QSch43xojVFs2lzJM4qhxEKJNN2RgkVlu2lIEXLpY1byJl0NxsEastU159yl7t+LJoDBKrLfONGsT6GLEsEMsCsSwQywKxLBDLArEsEMsCsSxYxpraxQq9Lr8R6/359wXP75980v8ry8MWt/mPFsnUPNNWrKUbmopWrLW8IFh90an1L93HhubgBefRaGdOjeN9+dUnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGDE/gABnExP9YwjUAAAAABJRU5ErkJggg==' }}
        ></div>
        <div className="w-full sm:w-3/5">
          <div className="p-8">
            <h1 className="text-3xl font-black text-slate-700">Sign up</h1>
            <p className="mt-2 mb-5 text-base leading-tight text-gray-600">
              Create an account to get access to 1000+ Questions
            </p>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="relative mt-2 w-full">
                <input
                  onChange={(e) => setuserName(e.target.value)}
                  type="text"
                  id="userName"
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=""
                  value={userName}
                />
                <label 
                  htmlFor="userName"
                  className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                >
                  Enter Your userName
                </label>
              </div>
              <div className="relative mt-2 w-full">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  id="email"
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder="abc@gmail.com"
                  value={email}
                />
                <label
                  htmlFor="email"
                  className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                >
                  Enter Your Email
                </label>
              </div>
              <div className="relative mt-2 w-full">
                <input    
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  value={password}
                />
                <label
                  htmlFor="password"
                  className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                >
                  Enter Your Password
                </label>
              </div>
              <button
                className="mt-4 w-full cursor-pointer rounded-lg bg-blue-600 pt-3 pb-3 text-white shadow-lg hover:bg-blue-400"
                type="submit"
              >
                Create Account
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                 to={"/sign-in"}
                  className="font-bold text-blue-600 no-underline hover:text-blue-400"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
