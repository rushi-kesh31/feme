function Footer(){
    return (
        <>
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-0">
            <div className="w-full max-w-screen-xl mx-auto p-0 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKzdXzRdcyELokCtEqIpxpx_2U9_-ZBKqJV8CWL_8Xc8TM4XwYKYRnm46Gpc9P6QjebI8RAKEEEmCQCeVU6c7kDcw0M8neA1ggHdRM0OsG9TYjGIKuUasp9ViUPTcgA9FIAj_uKpV1LomSOXcpbIo_2keOHkqJnoFEjMd_yZ9CgTlERq9W-4ohS8L2nhQ/s150/log.png" 
                            className="h-12" alt="Femessence Logo" />
                        </div>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FemEssence</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="mailto:abhinavbelani16@gmail.com">Contact Us</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">©️ 2024 <a href="https://flowbite.com/" className="hover:underline">Femessence</a>. All Rights Reserved.</span>
            </div>
        </footer>
        </>
    )
}

export default Footer;
