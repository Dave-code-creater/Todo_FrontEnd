import { Typography, Card, CardBody } from "@material-tailwind/react";
import { NavbarDefault } from "../../components/Navbar";

function ContentCard({ img, title, desc }) {
    return (
        <Card
            className="relative grid min-h-[30rem] items-end overflow-hidden rounded-xl"
            color="transparent"
        >
            <img
                src={img}
                alt="bg"
                className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/70" />
            <CardBody className="relative flex flex-col justify-end">
                <Typography variant="h4" color="white">
                    {title}
                </Typography>
                <Typography
                    variant="paragraph"
                    color="white"
                    className="my-2 font-normal"
                >
                    {desc}
                </Typography>
            </CardBody>
        </Card>
    );
}

const contents = [
    {
        img: "https://pentagram-production.imgix.net/ea053844-c063-4130-9425-4a193f82e1e3/ps_windows_01.jpg?rect=67%2C364%2C1665%2C1040&w=880&fit=crop&fm=jpg&q=70&auto=format&h=548",
        title: "Tải xuống trên Windows",
        desc: "Khách truy cập trang web ngày nay yêu cầu trải nghiệm người dùng không bị cản trở, đặc biệt là khi tải xuống phần mềm trên Windows. Chúng tôi đảm bảo rằng tiêu chuẩn cao luôn được duy trì.",
    },
    {
        img: "data:image/png;base64,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",
        title: "Tải xuống trên iOS",
        desc: "Chúng tôi luôn phát triển để mang đến trải nghiệm tải xuống tốt nhất trên iOS. Ứng dụng của chúng tôi dễ sử dụng và mang lại giá trị cao cho người dùng.",
    },
    {
        img: "https://1000logos.net/wp-content/uploads/2016/10/Android-Logo-2008.png",
        title: "Tải xuống trên Android",
        desc: "Android cung cấp sự tự do trong việc tùy chỉnh và sử dụng. Ứng dụng của chúng tôi được thiết kế để hoạt động mượt mà và ổn định trên các thiết bị Android.",
    },
];

export function BlogSection11() {
    return (
        <div className="bg-white">
            <NavbarDefault />
            <section className="container mx-auto px-8 py-10 lg:py-28">
                <Typography
                    variant="h2"
                    color="blue-gray"
                    className="!text-2xl !leading-snug lg:!text-3xl"
                >
                    Xây dựng điều gì đó tuyệt vời
                </Typography>
                <Typography
                    variant="lead"
                    className="mt-2 max-w-lg !font-normal !text-gray-500"
                >
                    Chúng tôi liên tục cố gắng thể hiện bản thân và hiện thực hóa ước mơ của mình. Nếu bạn có cơ hội tham gia trò chơi cuộc đời này, bạn cần phải trân trọng từng khoảnh khắc.
                </Typography>

                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
                    {contents.map(({ img, title, desc }) => (
                        <ContentCard key={title} img={img} title={title} desc={desc} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default BlogSection11;
