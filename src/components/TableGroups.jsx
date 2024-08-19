import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { DialogDefault } from './Join';
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from '../redux/actions/CompanySlice';
import { fetchUserById } from '../redux/actions/UserSlice';

const TABLE_HEAD = ["Member", "Role", "Employed", ""];

export function MembersTable() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.authLogin.user.userId);
  const companies = useSelector((state) => state.companyAction.companies);
  const employees = useSelector((state) => state.companyAction.companies?.employees ?? []); // Array of employee IDs
  const admins = useSelector((state) => state.companyAction.companies?.admin ?? []); // Array of admin IDs
  const users = useSelector((state) => state.userAction.users); // Fetched user details

  // Fetch companies if not already in state
  useEffect(() => {
    if (id && companies.length === 0) {
      dispatch(fetchCompanies(id));
    }
  }, [id, companies, dispatch]);

  // Fetch details for all employees and admins
  useEffect(() => {
    if (employees.length > 0) {
      employees.forEach((employee) => dispatch(fetchUserById(employee)));
    }
    if (admins.length > 0) {
      admins.forEach((admin) => dispatch(fetchUserById(admin)));
    }
  }, [employees, admins, dispatch]);

  // Combine employees and admins into one list
  const members = [...employees, ...admins]
    .map((memberId) => users.find((user) => user._id === memberId))
    .filter((user) => user !== undefined); // Make sure only valid users are mapped

  // Handle case when no members are found
  if (members.length === 0) {
    return <p>No members found yet. Add some employees or admins to see them here.</p>;
  }



  return (
    <div className="flex flex-col">
      {companies && companies.name ? (
        <div className="mt-8">
          <Card className="h-full w-full pb-2">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    {companies.name}
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    Thông tin chi tiết về thành viên
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button variant="outlined" size="sm">
                    Xem tất cả
                  </Button>
                  <Button className="flex items-center gap-3" size="sm">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm thành viên
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
                <tbody>
                  {members.map((member) => {
                    if (!member) return null; // Skip if no user data is found

                    // Check if the member is an admin
                    const isAdmin = admins.includes(member._id);

                    return (
                      <tr key={member._id}>
                        <td className="border-y border-blue-gray-100 p-4">
                          <div className="flex items-center gap-4">
                            <Avatar src={member.img} alt={member.username} size="sm" />
                            <div>
                              <Typography color="blue-gray" className="font-semibold">
                                {member.username} {isAdmin && <Chip value="Admin" color="green" size="sm" />}
                              </Typography>
                              <Typography color="blue-gray" className="font-normal">
                                {member.email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className="border-y border-blue-gray-100 p-4">
                          <Typography color="blue-gray" className="font-semibold">
                            {isAdmin ? "Admin" : "Employee"}
                          </Typography>
                        </td>
                        <td className="border-y border-blue-gray-100 p-4">
                          <Typography color="blue-gray" className="font-semibold">
                            {member.createdAt}
                          </Typography>
                        </td>
                        <td className="border-y border-blue-gray-100 p-4">
                          <div className="flex items-center gap-4">
                            <Tooltip
                              content="Edit"
                              direction="left"
                              className="rounded-md"
                            >
                              <IconButton color="lightBlue" size="sm">
                                <PencilIcon className="h-5 w-5" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>
          <DialogDefault />
        </div>
      ) : (
        <Card className="h-full w-full pb-2 mt-8">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  {companies.name}
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Bạn chưa tham gia vào nhóm nào
                </Typography>
              </div>
              <Button className="flex items-center">
                <DialogDefault />
              </Button>
            </div>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
