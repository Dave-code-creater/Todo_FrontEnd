import React from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { NavbarDefault } from "../../components/Navbar";
import { SimpleFooter } from "../../components/Footer";

export function ContactSection() {
    return (
        <div>
            <NavbarDefault />
            <section className="px-6 py-8 lg:py-8">
                <div className="container mx-auto text-center">
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-4 !text-base lg:!text-2xl"
                    >
                        Chăm Sóc Khách Hàng
                    </Typography>
                    <Typography
                        variant="h1"
                        color="blue-gray"
                        className="mb-4 !text-3xl lg:!text-5xl"
                    >
                        Chúng Tôi Luôn Sẵn Sàng Hỗ Trợ
                    </Typography>
                    <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500">
                        Dù là câu hỏi về dịch vụ của chúng tôi, yêu cầu hỗ trợ kỹ thuật, hay đề xuất cải tiến, đội ngũ của chúng tôi rất mong được lắng nghe từ bạn.
                    </Typography>
                    <div className="grid grid-cols-1 flex justify-center gap-y-6  px-5 md:px-10 lg:px-64">
                        <form
                            action="#"
                            className="flex flex-col gap-10"
                        >
                            <Typography
                                variant="small"
                                className="text-left !font-semibold !text-gray-600"
                            >
                                Chọn Tùy Chọn Cho Hợp Tác Kinh Doanh
                            </Typography>
                            <div className="flex gap-4">
                                <Button variant="outlined" className="max-w-fit">
                                    Câu hỏi chung
                                </Button>
                                <Button variant="outlined" className="max-w-fit">
                                    Hỗ trợ sản phẩm
                                </Button>
                                <Button variant="outlined" className="max-w-fit">
                                    Góp ý
                                </Button>
                                <Button variant="outlined" className="max-w-fit">
                                    Hợp tác kinh doanh
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Typography
                                        variant="small"
                                        className="mb-2 text-left font-medium !text-gray-900"
                                    >
                                        Tên
                                    </Typography>
                                    <Input
                                        color="gray"
                                        size="lg"
                                        placeholder="Tên"
                                        name="first-name"
                                        className="focus:border-t-gray-900"
                                        containerProps={{
                                            className: "!min-w-full",
                                        }}
                                        labelProps={{
                                            className: "hidden",
                                        }}
                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="small"
                                        className="mb-2 text-left font-medium !text-gray-900"
                                    >
                                        Họ
                                    </Typography>
                                    <Input
                                        color="gray"
                                        size="lg"
                                        placeholder="Họ"
                                        name="last-name"
                                        className="focus:border-t-gray-900"
                                        containerProps={{
                                            className: "!min-w-full",
                                        }}
                                        labelProps={{
                                            className: "hidden",
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <Typography
                                    variant="small"
                                    className="mb-2 text-left font-medium !text-gray-900"
                                >
                                    Email của bạn
                                </Typography>
                                <Input
                                    color="gray"
                                    size="lg"
                                    placeholder="ten@email.com"
                                    name="email"
                                    className="focus:border-t-gray-900"
                                    containerProps={{
                                        className: "!min-w-full",
                                    }}
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                />
                            </div>
                            <div>
                                <Typography
                                    variant="small"
                                    className="mb-2 text-left font-medium !text-gray-900"
                                >
                                    Tin nhắn của bạn
                                </Typography>
                                <Textarea
                                    rows={6}
                                    color="gray"
                                    placeholder="Tin nhắn"
                                    name="message"
                                    className="focus:border-t-gray-900"
                                    containerProps={{
                                        className: "!min-w-full",
                                    }}
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                />
                            </div>
                            <Button className="w-full" color="gray">
                                Gửi tin nhắn
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
            <SimpleFooter />
        </div>
    );
}

export default ContactSection;
