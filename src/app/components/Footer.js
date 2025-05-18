const Footer = () => {
    return (
        <footer className="w-full bg-white py-6 px-0 md:px-0">
            <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-2 px-4">
                <div className="text-center md:text-left w-full md:w-auto mb-2 md:mb-0">
                    © 2025 Company Name. All Rights Reserved.
                </div>
                <div className="flex gap-6 w-full md:w-auto justify-center md:justify-end">
                    <a
                        href="#"
                        className="hover:text-gray-600 transition-colors">
                        LinkedIn
                    </a>
                    <a
                        href="#"
                        className="hover:text-gray-600 transition-colors">
                        Instagram
                    </a>
                    <a
                        href="#"
                        className="hover:text-gray-600 transition-colors">
                        Facebook
                    </a>
                    <a
                        href="#"
                        className="hover:text-gray-600 transition-colors">
                        Twitter
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
