import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Sheard/Loading/Loading";
import userImage from '../../../assets/male.png';


const AllUsers = () => {
  const { handleSubmit, register } = useForm();
  const { axiosSecure } = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [userCategory, setUserCategory] = useState("All Users");
  const [control, setControl] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  // TODO change user role
  useEffect(() => {
    setIsLoading(true);
    axiosSecure.get("/get-all-users").then((res) => {
      setUsers(res.data?.data);
      setIsLoading(false);
    });
  }, [control]);

  // update order status func
  const updateUserRole = (role, userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are changed User Role",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          id: userId,
          role: role,
        };
        console.log(data);
        axiosSecure
          .put("/update-user-role", data)
          .then((res) => {
            console.log(res);
            if (res?.data?.success) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "user Update role successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              setControl(!control)
            }
          })
          .catch((err) => {
            console.log(err?.message);
          });
      }
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const options = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="p-3">
      <div className="my-8 bg-slate-50 shadow rounded p-5">
        <div className="flex gap-3 justify-between items-center mb-3">
          <h2 className="my-subtitle text-slate-600">All Users</h2>
        </div>

        {/* react tab */}
        <Tabs>
          <TabList
            className={
              "flex gap-5 items-stretch my-5 border-b border-[#0621bb6b]"
            }
          >
            {["All Users", "user", "admin"]?.map((elem, ind) => {
              return (
                <Tab
                  key={ind}
                  onClick={() => setUserCategory(elem)}
                  className={`py-2 first-letter:uppercase !bg-transparent cursor-pointer outline-none ${userCategory === elem
                    ? "!border-b-2 !border-[#0621bb] !text-[#0621bb]"
                    : "border-none"
                    }`}
                >
                  {elem}
                </Tab>
              );
            })}
          </TabList>

          {["All Users", "user", "admin"]?.map((elem, ind) => {
            return (
              <TabPanel key={ind}>
                {/* search inp */}
                <div className="relative mx-auto w-[80%] flex justify-center my-8">
                  <input
                    placeholder="search here..."
                    type="text"
                    className="bg-white py-3 w-full pl-14 border-2 rounded-full outline-none border-stone-300 text-black"
                  />{" "}
                  <span className="absolute top-1/2 -translate-y-1/2 left-5 text-stone-300">
                    <FaSearch></FaSearch>
                  </span>{" "}
                </div>
                {/* Table */}
                <div className="overflow-x-auto mt-10">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Change Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoading &&
                        users
                          ?.filter((user) =>
                            userCategory === "All Users"
                              ? true
                              : user.role === userCategory
                          )
                          .map((user, i) => {
                            const { _id, name, avatar, role, email } = user || {};
                            console.log(_id);
                            return (
                              <tr key={_id}>
                                <th>{i + 1}</th>
                                <td>
                                  <span className="border block  w-[60px] h-[60px] relative rounded overflow-hidden">
                                    <img
                                      style={{ objectFit: "cover" }}
                                      src={avatar ? avatar : userImage}
                                      fill={true}
                                      alt="user Phone"
                                    />
                                  </span>
                                </td>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{role}</td>
                                <td>
                                  <select
                                    defaultValue={role}
                                    onChange={(e) =>
                                      updateUserRole(e.target.value, _id)
                                    }
                                    className="px-4 py-2 border bg-none"
                                    name=""
                                    id=""
                                  >
                                    {options?.map((option, i) => (
                                      <option key={i} value={option.value}>
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default AllUsers;
