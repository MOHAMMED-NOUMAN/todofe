import React,{useState} from 'react'
import { Link,useNavigate  } from 'react-router-dom'
import api from '../api/axiosConfig'
import toast from 'react-hot-toast';
const AddUser = () => {
    const [user,setUser] = useState({
        name:"",
        email:"",
        address:""
    })
    const navigate = useNavigate(); 
    const inputHandler = (e)=>{
        const {name,value} = e.target;
        console.log(name,value);
        setUser({...user,[name]:value})
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("[AddUser] Submitting user:", user);
        await api.post("/api/user", user)
            .then((response) => {
                console.log("[AddUser] Success response:", response.data);
                toast.success(response.data.message, { position: "top-center" });
                navigate("/");
            })
            .catch(error => {
                console.error("[AddUser] Error adding user:", error.response?.data || error.message);
            })
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-7">
        <div className="flex justify-start mb-4">
                <Link
                    to="/"
                    className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-xl font-medium transition duration-300"
                  >
                    <i className="fa-solid fa-angle-left mr-2"></i>
                    Back
                  </Link>
        </div>
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add User
        </h3>

        <form className="space-y-5"  onSubmit={submitHandler}>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-gray-700 font-medium">
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter Your Name"
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter Your Email"
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-gray-700 font-medium">
              Address
            </label>

            <input
              type="text"
              id="address"
              name="address"
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter Your Address"
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Add User
          </button>

        </form>
      </div>
    </div>
  )
}

export default AddUser