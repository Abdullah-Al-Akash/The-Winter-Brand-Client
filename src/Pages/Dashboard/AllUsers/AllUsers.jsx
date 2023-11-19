import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Sheard/Loading/Loading";
import userImage from '../../../assets/male.png';
import HelmetSeo from "../../../Component/shared/Helmet";
import { Link, useLocation } from "react-router-dom";


const AllUsers = () => {
  const { handleSubmit, register } = useForm();
  const { axiosSecure } = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [tap, setTap] = useState("all")
  const location = useLocation();
  const [control, setControl] = useState(true);
  const queryParams = new URLSearchParams(location.search);
  const [totalData, setTotalData] = useState(20)


  let currentPage = 1;

  const dataPerPage = 20
  let pageNumbers = []
  const totalPages = Math.ceil(totalData / dataPerPage)
  let skip = (currentPage - 1) * dataPerPage
  const pageNumber = Number(queryParams.get('page'))
  if (Number(pageNumber >= 1)) {
    currentPage = pageNumber
  }

  for (let i = currentPage - 3; i <= currentPage + 3; i++) {
    if (i < 1) continue;
    if (i > totalPages) break;
    pageNumbers.push(i)
  }


  useEffect(() => {
    axiosSecure.get(`/get-all-users?skip=${skip}&limit=${dataPerPage}&role=${tap}`).then((res) => {
      setUsers(res?.data?.data);
      setTotalData(res?.data?.meta?.total || 20)
    });
  }, [control, currentPage, tap]);

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

  const searchUsers = (e) => {
    e.preventDefault()
    const searchText = e.target?.searchInput?.value
    if (!searchText) {
      toast("please give value in search field")
      return
    }

    axiosSecure.get(`/search-users/${searchText}`)
      .then(res => {
        setUsers(res?.data?.data || [])
      }).catch(err => console.log(err.message))

  }
  const options = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];

  return (
    <div className="p-3">
      <HelmetSeo
        title="All users"
        canonical={"dashboard/all-users"}
        description=""
      />
      <div className="my-8 bg-slate-50 shadow rounded p-5">
        <div className="flex gap-3 justify-between items-center mb-3">
          <h2 className="my-subtitle text-slate-600">All Orders</h2>
        </div>
        <div className="relative">
          <ul className="flex gap-5 items-stretch my-5 py-2">


            <li
              onClick={() => setTap("all")}
              className={
                tap === "all"
                  ? "border-b-2 border-[#0621bb] text-[#0621bb] py-2 uppercase cursor-pointer"
                  : "py-2 uppercase cursor-pointer"
              }
            >
              All Users
            </li>
            <li
              onClick={() => setTap("user")}
              className={
                tap === "user"
                  ? "border-b-2 border-[#0621bb] text-[#0621bb] py-2 uppercase cursor-pointer"
                  : "py-2 uppercase cursor-pointer"
              }
            >
              Users
            </li>
            <li
              onClick={() => setTap("admin")}
              className={
                tap === "admin"
                  ? "border-b-2 border-[#0621bb] text-[#0621bb] py-2 uppercase cursor-pointer"
                  : "py-2 uppercase cursor-pointer"
              }
            >
              Admins
            </li>

          </ul>
          <hr className="-mt-[29px]" />
        </div>



        <form className="relative mx-auto w-[80%] flex justify-center my-8" onSubmit={searchUsers}>
          <input
            placeholder="search by name and email.. write and enter"
            type="text"
            required
            name="searchInput"
            className="bg-white py-3 w-full pl-14 border-2 rounded-full outline-none border-stone-300 text-black"
          />
          <span className="absolute top-1/2 -translate-y-1/2 left-5 text-stone-300">
            <FaSearch></FaSearch>
          </span>
        </form>



        {/* Table */}
        <div className="overflow-x-auto mt-10">
          <table className="table w-[1200px]">
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
            {users?.length == 0 ? (
              <div className="flex items-center h-[100px]">
                <h3 className="text-center text-lg">There is no order here!</h3>
              </div>
            ) : (
              <tbody>
                {users &&
                  users?.map((user, i) => {
                    const { _id, name, avatar, role, email } = user || {};

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
            )}
          </table>

        </div>
        <div className="text-center my-5">
          {
            currentPage - 1 >= 1 && (
              <>
                <Link to={"/dashboard/all-users"}>{"<<"}</Link>
              </>
            )
          }
          {
            pageNumbers?.map((page, i) => <Link className={page === currentPage ? "bg-black px-2 py-1 rounded text-white mx-2" : "border-2 px-2 py-1 rounded text-white mx-2"} key={i} to={`/dashboard/all-users?page=${page}`}>{page}</Link>)
          }
          {
            currentPage + 1 <= totalPages && (
              <>
                <Link to={"/dashboard/all-users"}>{">>"}</Link>
              </>
            )
          }
        </div>
      </div>

    </div>
  );
};

export default AllUsers;
