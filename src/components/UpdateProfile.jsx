import React from "react";

// @material-tailwind/react
import {
    Input,
    Typography,
    Select,
    Option,
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
} from "@material-tailwind/react";

// day picker
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";


// @heroicons/react
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function Account1() {
    const [date, setDate] = React.useState();
    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [gender, setGender] = React.useState();
    const [email, setEmail] = React.useState();
    const [confirmEmail, setConfirmEmail] = React.useState();
    const [location, setLocation] = React.useState();
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [language, setLanguage] = React.useState();
    const [skills, setSkills] = React.useState();
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            date,
            firstName,
            lastName,
            gender,
            email,
            confirmEmail,
            location,
            phoneNumber,
            language,
            skills,
        });

        setDate();
        setFirstName();
        setLastName();
        setGender();
        setEmail();
        setConfirmEmail();
        setLocation();
        setPhoneNumber();
        setLanguage();
        setSkills();
    }

    return (
        <section className="px-8 py-20 container mx-auto">
            <Typography variant="h5" color="blue-gray">
                Thông Tin Cơ Bản
            </Typography>
            <Typography
                variant="small"
                className="text-gray-600 font-normal mt-1"
            >
                Cập nhật thông tin hồ sơ của bạn bên dưới.
            </Typography>
            <div className="flex flex-col mt-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Tên
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Linh"
                                labelProps={{
                                    className: "hidden",
                                }}
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            />
                        </div>
                        <div className="w-full">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Họ
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Đỗ"
                                labelProps={{
                                    className: "hidden",
                                }}
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            />
                        </div>
                    </div>
                    <div className="mb-6 flex flex-col gap-4 md:flex-row">
                        <div className="w-full">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Giới Tính
                            </Typography>
                            <label className="hidden">Giới Tính</label>
                            <Select
                                size="small"
                                labelProps={{
                                    className: "hidden",
                                }}
                                required=""
                                className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                            >
                                <Option value="" disabled selected>Chọn Giới Tính</Option>
                                <Option value="male">Nam</Option>
                                <Option value="female">Nữ</Option>
                                <Option value="other">Khác</Option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Ngày Sinh
                            </Typography>
                            <Popover placement="bottom">
                                <PopoverHandler>
                                    <Input
                                        size="lg"
                                        onChange={() => null}
                                        placeholder="Chọn Ngày"
                                        value={date ? format(date, "PPP") : ""}
                                        labelProps={{
                                            className: "hidden",
                                        }}
                                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                    />
                                </PopoverHandler>
                                <PopoverContent>
                                    <DayPicker
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        showOutsideDays
                                        className="border-0"
                                        classNames={{
                                            caption:
                                                "flex justify-center py-2 mb-4 relative items-center",
                                            caption_label: "text-sm !font-medium text-gray-900",
                                            nav: "flex items-center",
                                            nav_button:
                                                "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                            nav_button_previous: "absolute left-1.5",
                                            nav_button_next: "absolute right-1.5",
                                            table: "w-full border-collapse",
                                            head_row: "flex !font-medium text-gray-900",
                                            head_cell: "m-0.5 w-9 !font-normal text-sm",
                                            row: "flex w-full mt-2",
                                            cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                            day: "h-9 w-9 p-0 !font-normal",
                                            day_range_end: "day-range-end",
                                            day_selected:
                                                "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                            day_today: "rounded-md bg-gray-200 text-gray-900",
                                            day_outside:
                                                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                            day_disabled: "text-gray-500 opacity-50",
                                            day_hidden: "invisible",
                                        }}
                                        components={{
                                            IconLeft: ({ ...props }) => (
                                                <ChevronLeftIcon
                                                    {...props}
                                                    className="h-4 w-4 stroke-2"
                                                />
                                            ),
                                            IconRight: ({ ...props }) => (
                                                <ChevronRightIcon
                                                    {...props}
                                                    className="h-4 w-4 stroke-2"
                                                />
                                            ),
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Email
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Linh@mail.com"
                                labelProps={{
                                    className: "hidden",
                                }}
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            />
                        </div>
                        <div className="w-full">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Xác Nhận Email
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Linh@mail.com"
                                labelProps={{
                                    className: "hidden",
                                }}
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            />
                        </div>
                    </div>
                    <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                        <div className="w-full">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Địa Chỉ
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="123 Thanh Xuân, Hà Nội"
                                labelProps={{
                                    className: "hidden",
                                }}
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            />
                        </div>
                        <div className="w-full">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Số Điện Thoại
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="0905 823 234"
                                labelProps={{
                                    className: "hidden",
                                }}
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            />
                        </div>
                    </div>

                </form>
                <div className="flex justify-end mt-8">
                    <Button
                        type="submit"
                        className="w-80 mt-8 stick bottom-0 right-0"
                    >
                        Thay Đổi Thông Tin
                    </Button>
                </div>
            </div>

        </section >
    );
}

export default Account1;
