import React from "react";
import { Typography } from "@material-tailwind/react";
import { NavbarDefault } from "../../components/Navbar";

const faqs = [
    {
        title: "Làm thế nào để tôi đặt hàng?",
        desc: "Chúng ta không phải lúc nào cũng ở trong vị trí mà chúng ta mong muốn. Chúng ta không ngừng phát triển. Chúng ta không ngừng mắc sai lầm. Chúng ta không ngừng cố gắng thể hiện bản thân và thực hiện những ước mơ của mình. Nếu bạn có cơ hội để chơi trò chơi cuộc đời này, bạn cần phải trân trọng từng khoảnh khắc. Rất nhiều người không trân trọng khoảnh khắc cho đến khi nó qua đi.",
    },
    {
        title: "Làm thế nào tôi có thể thanh toán?",
        desc: "Nó thực sự quan trọng và sau đó nó thực sự không quan trọng. Điều quan trọng là những người được khơi dậy bởi điều đó. Và những người cảm thấy bị xúc phạm bởi điều đó, điều đó không quan trọng. Bởi vì nó là để động viên những người hành động. Bởi vì tôi ở đây để theo đuổi ước mơ của mình và truyền cảm hứng cho người khác theo đuổi ước mơ của họ. Chúng ta không phải lúc nào cũng ở trong vị trí mà chúng ta mong muốn.",
    },
];

export function Faqs4() {
    return (

        <div className="bg-white">
            <NavbarDefault />
            <section className="px-8 py-20">
                <div className="container mx-auto">
                    <div className="mb-14 text-center ">
                        <Typography
                            variant="h1"
                            color="blue-gray"
                            className="mb-4 text-4xl !leading-snug lg:text-[40px]"
                        >
                            Các câu hỏi thường gặp
                        </Typography>
                        <Typography
                            className="mx-auto font-normal text-[18px] !text-gray-500 lg:max-w-3xl"
                        >
                            Rất nhiều người không trân trọng khoảnh khắc cho đến khi nó qua đi. Tôi không cố gắng hết sức, và tôi không cố gắng làm điều đó.
                        </Typography>
                    </div>
                    <div className="max-w-3xl mx-auto grid gap-10">
                        {faqs.map(({ title, desc }) => (
                            <div key={title}>
                                <Typography color="blue-gray" className="pb-6 text-[20px] font-bold">
                                    {title}
                                </Typography>
                                <div className="border-t border-gray-200 pt-4">
                                    <Typography className="font-normal !text-gray-500">
                                        {desc}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Faqs4;
