import { NavbarDefault } from "../../components/Navbar";
import { SimpleFooter } from "../../components/Footer";
import { Typography } from "@material-tailwind/react";

export function LicenseSection() {
    return (
        <div>
            <NavbarDefault />
            <section className="px-6 py-8 lg:py-8">
                <div className="container mx-auto">
                    <Typography
                        color="blue-gray"
                        className="text-center mb-8 !text-3xl lg:!text-5xl"
                    >
                        Thông Tin Giấy Phép
                    </Typography>
                    <div className="grid grid-cols-1 gap-y-6 text-left">
                        <Typography>
                            Tailwind Labs Inc. grants you an ongoing, non-exclusive license to use the Components and Templates. The license grants permission to <strong>one individual</strong> (the Licensee) to access and use the Components and Templates.
                        </Typography>
                        
                        <Typography>
                            <strong>You can:</strong>
                            <ul className="list-disc ml-6 mt-2">
                                <li>Use the Components and Templates to create unlimited End Products.</li>
                                <li>Modify the Components and Templates to create derivative components and templates. Those components and templates are subject to this license.</li>
                                <li>Use the Components and Templates to create unlimited End Products for unlimited Clients.</li>
                                <li>Use the Components and Templates to create End Products where the End Product is sold to End Users.</li>
                                <li>Use the Components and Templates to create End Products that are open source and freely available to End Users.</li>
                            </ul>
                        </Typography>

                        <Typography>
                            <strong>You cannot:</strong>
                            <ul className="list-disc ml-6 mt-2">
                                <li>Use the Components and Templates to create End Products that are designed to allow an End User to build their own End Products using the Components and Templates or derivatives of the Components and Templates.</li>
                                <li>Re-distribute the Components and Templates or derivatives of the Components and Templates separately from an End Product, neither in code or as design assets.</li>
                                <li>Share your access to the Components and Templates with any other individuals.</li>
                                <li>Use the Components and Templates to produce anything that may be deemed by Tailwind Labs Inc, in their sole and absolute discretion, to be competitive or in conflict with the business of Tailwind Labs Inc.</li>
                            </ul>
                        </Typography>

                        <Typography className="text-lg font-semibold mt-4">Example usage</Typography>
                        <Typography>
                            Examples of usage <strong>allowed</strong> by the license:
                            <ul className="list-disc ml-6 mt-2">
                                <li>Creating a personal website by yourself.</li>
                                <li>Creating a website or web application for a client that will be owned by that client.</li>
                                <li>Creating a commercial SaaS application (like an invoicing app, for example) where end users have to pay a fee to use the application.</li>
                                <li>Creating a commercial self-hosted web application that is sold to end users for a one-time fee.</li>
                                <li>Creating a web application where the primary purpose is clearly not to simply re-distribute the components (like a conference organization app that uses the components for its UI, for example) that is free and open source, where the source code is publicly available.</li>
                            </ul>
                        </Typography>
                        
                        <Typography>
                            Examples of usage <strong>not allowed</strong> by the license:
                            <ul className="list-disc ml-6 mt-2">
                                <li>Creating a repository of your favorite Tailwind UI components or templates (or derivatives based on Tailwind UI components or templates) and publishing it publicly.</li>
                                <li>Creating a UI library using Tailwind UI components and making it available either for sale or for free.</li>
                                <li>Converting a Tailwind UI template to another framework and making it available either for sale or for free.</li>
                                <li>Creating a "website builder" project where end users can build their own websites using components or templates included with or derived from Tailwind UI.</li>
                                <li>Creating a theme, template, or project starter kit using the components or templates and making it available either for sale or for free.</li>
                                <li>Creating an admin panel tool (like <a href="https://nova.laravel.com/">Laravel Nova</a> or <a href="https://activeadmin.info/">ActiveAdmin</a>) that is made available either for sale or for free.</li>
                            </ul>
                        </Typography>

                        <Typography className="text-lg font-semibold mt-4">Personal License Definitions</Typography>
                        <Typography>
                            <ul className="list-disc ml-6 mt-2">
                                <li>Licensee is the individual who has purchased a Personal License.</li>
                                <li>Components and Templates are the source code and design assets made available to the Licensee after purchasing a Tailwind UI license.</li>
                                <li>End Product is any artifact produced that incorporates the Components or Templates or derivatives of the Components or Templates.</li>
                                <li>End User is a user of an End Product.</li>
                                <li>Client is an individual or entity receiving custom professional services directly from the Licensee, produced specifically for that individual or entity. Customers of software-as-a-service products are not considered clients for the purpose of this document.</li>
                            </ul>
                        </Typography>

                        <Typography className="text-lg font-semibold mt-4">Team License</Typography>
                        <Typography>
                            Tailwind Labs Inc. grants you an ongoing, non-exclusive license to use the Components and Templates. The license grants permission for <strong>up to 25 Employees and Contractors of the Licensee</strong> to access and use the Components and Templates.
                        </Typography>
                        
                        <Typography>
                            <strong>You can:</strong>
                            <ul className="list-disc ml-6 mt-2">
                                <li>Use the Components and Templates to create unlimited End Products.</li>
                                <li>Modify the Components and Templates to create derivative components and templates. Those components and templates are subject to this license.</li>
                                <li>Use the Components and Templates to create unlimited End Products for unlimited Clients.</li>
                                <li>Use the Components and Templates to create End Products where the End Product is sold to End Users.</li>
                                <li>Use the Components and Templates to create End Products that are open source and freely available to End Users.</li>
                            </ul>
                        </Typography>

                        <Typography>
                            <strong>You cannot:</strong>
                            <ul className="list-disc ml-6 mt-2">
                                <li>Use the Components or Templates to create End Products that are designed to allow an End User to build their own End Products using the Components or Templates or derivatives of the Components or Templates.</li>
                                <li>Re-distribute the Components or Templates or derivatives of the Components or Templates separately from an End Product.</li>
                                <li>Use the Components or Templates to create End Products that are the property of any individual or entity other than the Licensee or Clients of the Licensee.</li>
                                <li>Grant access to the Components and Templates to individuals who are not an Employee or Contractor of the Licensee.</li>
                                <li>Use the Components or Templates to produce anything that may be deemed by Tailwind Labs Inc, in their sole and absolute discretion, to be competitive or in conflict with the business of Tailwind Labs Inc.</li>
                            </ul>
                        </Typography>

                        <Typography className="text-lg font-semibold mt-4">Enforcement</Typography>
                        <Typography>
                            If you are found to be in violation of the license, access to your Tailwind UI account will be terminated, and a refund may be issued at our discretion. When license violation is blatant and malicious (such as intentionally redistributing the Components or Templates through private warez channels), no refund will be issued.
                        </Typography>
                        <Typography>
                            The copyright of the Components and Templates is owned by Tailwind Labs Inc. You are granted only the permissions described in this license; all other rights are reserved. Tailwind Labs Inc. reserves the right to pursue legal remedies for any unauthorized use of the Components or Templates outside the scope of this license.
                        </Typography>

                        <Typography className="text-lg font-semibold mt-4">Liability</Typography>
                        <Typography>
                            Tailwind Labs Inc.’s liability to you for costs, damages, or other losses arising from your use of the Components or Templates — including third-party claims against you — is limited to a refund of your license fee. Tailwind Labs Inc. may not be held liable for any consequential damages related to your use of the Components or Templates.
                        </Typography>
                        <Typography>
                            This Agreement is governed by the laws of the Province of Ontario and the applicable laws of Canada. Legal proceedings related to this Agreement may only be brought in the courts of Ontario. You agree to service of process at the e-mail address on your original order.
                        </Typography>

                        <Typography className="text-lg font-semibold mt-4">Questions?</Typography>
                        <Typography>
                            Unsure which license you need, or unsure if your use case is covered by our licenses? Email us at <a href="mailto:support@tailwindui.com">support@tailwindui.com</a> with your questions.
                        </Typography>
                    </div>
                </div>
            </section>
            <SimpleFooter />
        </div>
    );
}
