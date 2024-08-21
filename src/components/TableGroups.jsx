import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { DialogDefault } from './Join';
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from '../redux/actions/CompanySlice';
import { fetchUserById } from '../redux/actions/UserSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MembersTable } from "./Tables";
import { fetchTasks } from '../redux/actions/TaskSlice';

const TABLE_HEAD = ["Member", "Role", "Employed", ""];

export function GroupTable() {
  const dispatch = useDispatch();
  const [userStates, setUserStates] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const currentUserId = useSelector((state) => state.authLogin.user.userId);
  const companies = useSelector((state) => state.companyAction.companies);
  const users = useSelector((state) => state.userAction.users);

  useEffect(() => {
    dispatch(fetchCompanies(currentUserId));
  }, [dispatch, currentUserId]);

  useEffect(() => {
    if (companies.length) {
      companies.forEach((company) => {
        company.employees.forEach((employeeId) => {
          dispatch(fetchUserById(employeeId));
        });
        company.admin.forEach((adminId) => {
          dispatch(fetchUserById(adminId));
        });
      });
    }
  }, [companies, dispatch]);

  useEffect(() => {
    if (selectedUserId) {
      console.log('Fetching tasks for user:', selectedUserId);
      dispatch(fetchTasks(selectedUserId));
    }
  }, [selectedUserId, dispatch]);

  const handleButtonClick = (userId) => {
    setSelectedUserId((prevSelectedUserId) =>
      prevSelectedUserId === userId ? null : userId
    );
  };

  const copyUUIDIntoClipboard = (companyUUID) => {
    if (document.hasFocus()) {
      navigator.clipboard.writeText(companyUUID)
        .then(() => {
          toast.success('UUID copied to clipboard');
        })
        .catch((error) => {
          console.error('Failed to copy UUID:', error);
          toast.error('Failed to copy UUID');
        });
    } else {
      console.error('Document is not focused');
      toast.error('Cannot copy UUID, document is not focused');
    }
  };

  if (companies.length === 0) {
    return (
      <Card className="h-full w-full pb-2 mt-8">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography color="gray" className="mt-1 font-normal">
                Bạn chưa tham gia vào nhóm nào
              </Typography>
            </div>
            <div className="flex items-center">
              <DialogDefault />
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="flex flex-col">
      <ToastContainer />
      {companies.map((company) => (
        <div key={company._id} className="mt-8">
          <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    {company.name}
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    Thông tin chi tiết về thành viên
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button variant="outlined" size="sm">
                    Xem tất cả
                  </Button>
                  <Button
                    className="flex items-center gap-3"
                    size="sm"
                    onClick={() => copyUUIDIntoClipboard(company.companyUUID)}
                  >
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                    Mã nhóm
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-hidden px-0">
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm divide-y">
                  {users.map((user) => {
                    const isAdmin = company.admin.includes(user._id);
                    const isEmployee = company.employees.includes(user._id);
                    const isCurrentUserAdmin = company.admin.includes(currentUserId);

                    return (
                      <tr key={user._id}>
                        <td className="border-y border-blue-gray-100 p-4">
                          <div className="flex items-center gap-4">
                            <Avatar src={user.img} alt={user.username} size="sm" />
                            <div>
                              <Typography color="blue-gray" className="font-semibold">
                                {user.username}
                              </Typography>
                              <Typography color="blue-gray" className="font-normal">
                                {user.email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className="border-y border-blue-gray-100 p-4">
                          {isAdmin ? "Admin" : "Employee"}
                        </td>
                        <td className="border-y border-blue-gray-100 p-4">
                          {isEmployee ? "Yes" : "No"}
                        </td>
                        <td className="border-y border-blue-gray-100 p-4">
                          <div className="flex items-center gap-4">
                            <Tooltip content="Edit">
                              <IconButton color="lightBlue" size="sm">
                                <PencilIcon className="h-5 w-5" />
                              </IconButton>
                            </Tooltip>
                            {isCurrentUserAdmin && (
                              <Tooltip content="Xem chi tiết">
                                <IconButton
                                  color="lightBlue"
                                  size="sm"
                                  onClick={() => handleButtonClick(user._id)}
                                >
                                  <MagnifyingGlassIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {selectedUserId === user._id && (
                              <MembersTable id={user._id}/>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  
                </tbody>
              </table>
              
            </CardBody>
          </Card>
        </div>
      ))}
      
      <div className="pb-2 mt-8">
        <DialogDefault />
      </div>
    </div>
  );
}
