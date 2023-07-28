// import Head from "next/head";
// import Link from "next/link";
import { api } from "~/utils/api";



// export default function Home() {
//   return (
//     <>
//       <div className="bg-rose-50 h-screen items-center flex justify-center">
//         {/* login Container */}
//         <div className="bg-gray-500  rounded-xl flex items-center">
//           {/* form  */}
//           <div className="px-4 items-center h-3/4 md:w-1/2 bg-red-500 flex-col">
//             <h1 className="font-bold text-2xl text-black">Register</h1>
//             <p className="text-base m-4">If you are already a member</p>

//             <form action="" className="flex-col flex min-h-[80%] m-2">
//               <input className="rounded-lg bg-slate-500 min-w-3/4"
//                 type="email" name="emailField" placeholder="email"></input>
//               <input className="rounded-lg bg-slate-500 min-w-3/4"
//                 type="password" name="password" placeholder="password"></input>
//               <input className="rounded-lg bg-slate-500 min-w-3/4"
//                 type="password" name="confirmPassword" placeholder="Confirm password"></input>
//             </form>

//             {/* button */}
//             <button className="bg-white text-black">Submit</button>
//           </div>
//           {/* Image div */}
//           <div className="md:block hidden w-1/2 p-5">
//             <img className="rounded-2xl" src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmV3c2xldHRlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
import React, { useState } from 'react';
// import { trpc } from '~/utils/trpc'; // Import the tRPC client

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      // Call the 'register' public procedure using the tRPC client
      // const response = await api.register.mutation('authRouter.register', {
      //   email,
      //   name: '', // If you want to collect the user's name, add it here
      //   password,
      // });

      // const response = await api.authorisation.registerUser.useMutation
      // ({
      //   email,
      //   name: '', // If you want to collect the user's name, add it here
      //   password,
      //   // input: {
      //   //   email,
      //   //   name: '', // If you want to collect the user's name, add it here
      //   //   password,
      //   // },
      // });

      const response = api.authorisation.registerUser.useMutation({
        input: {
          email,
          name: '', // If you want to collect the user's name, add it here
          password,
        },
      });
      
      

      console.log(response); // Handle the response from the server as per your requirement
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <div className="bg-rose-50 h-screen items-center flex justify-center">
        {/* login Container */}
        <div className="bg-gray-500  rounded-xl flex items-center">
          {/* form  */}
          <div className="px-4 items-center h-3/4 md:w-1/2 bg-red-500 flex-col">
            <h1 className="font-bold text-2xl text-black">Register</h1>
            <p className="text-base m-4">If you are already a member</p>

            <form onSubmit={handleRegister} className="flex-col flex min-h-[80%] m-2">
              <input
                className="rounded-lg bg-slate-500 min-w-3/4"
                type="email"
                name="emailField"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="rounded-lg bg-slate-500 min-w-3/4"
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="rounded-lg bg-slate-500 min-w-3/4"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {/* Add a 'Submit' button */}
              <button type="submit" className="bg-white text-black">
                Submit
              </button>
            </form>
          </div>
          {/* Image div */}
          <div className="md:block hidden w-1/2 p-5">
            <img
              className="rounded-2xl"
              src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmV3c2xldHRlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="Registration Image"
            />
          </div>
        </div>
      </div>
    </>
  );
}

