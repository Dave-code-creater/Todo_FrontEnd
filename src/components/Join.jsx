import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {addEmployeeByCompanyUUID} from '../redux/actions/CompanySlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function DialogDefault() {
  const [open, setOpen] = React.useState(false);
  const [companyUUID, setCompanyUUID] = React.useState("");
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(!open);
  const id = useSelector((state) => state.authLogin.user.userId);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEmployeeByCompanyUUID({companyUUID,id}));
    setCompanyUUID("");

  };
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Tham gia nhóm mới
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Nhập mã nhóm.</DialogHeader>
        <DialogBody>
          <p>Điền mã nhóm để gia nhập</p>
          <form onSubmit={handleSubmit} method="POST">
            <input
              type="text"
              placeholder="Nhập mã nhóm"
              value={companyUUID}
              className="border-2 border-gray-300 p-2 w-full rounded-md"
                onChange={(e) => setCompanyUUID(e.target.value)}
            />
            </form>

        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="black"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Thoát</span>
          </Button>
          <Button type="submit" variant="gradient" color="green" onClick={handleSubmit}>
            <span>Tham gia</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}