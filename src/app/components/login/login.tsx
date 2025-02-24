import Link from "next/link";

interface LinkButtonProps {
    text: string;
    href: string;
}

const LinkButton = ({text, href}: LinkButtonProps) => {
    return (
        <Link className={"text-xl md:text-lg lg:text-xl min-w-fit"} href={href}>
            <button type="button"
                    className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:outline-none active:bg-white font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 dark:active:bg-white mb-2 md:mb-1 lg:mb-2 mt-2 md:mt-1 lg:mt-2">
                <svg
                    aria-label="Auth0" role="img"
                    viewBox="0 0 512 512"
                    className={"w-5 h-5 me-2 -ms-1"}
                >
                    <rect
                        width="15%" height="15%"
                        rx="15%"
                        fill="#000000"/>
                    <path
                        d="M358.1 378.8L319.6 260L420.5 186.9H295.7l-38.6-118.7l-.01-.03h124.8l38.6 118.7v-.003l0.03-.02c22.4 68.8-.7 147 -62.4 192zm-201.9 0l-.036 .03L257.13 452.2L358.09 378.84L257.17 305.51ZM93.85 186.85c-23.57 72.57 3.79 149.46 62.36 192l0.01-.036L194.77 260.17L93.89 186.87H218.6L257.15 68.2L257.2 68.2H132.4Z"
                        fill="#000000"/>
                </svg>
                {text}
            </button>
        </Link>
    )
}


export default function Login() {
    return (
        <div
            className={"h-screen w-screen overflow-hidden flex flex-col flex-nowrap justify-center items-center gap-5"}>
            <div className={"flex flex-col justify-center items-center bg-gray-300 rounded-lg px-8 md:px-10 lg:px-16 py-8 md:py-10 lg:py-16 bg-opacity-60  border-solid border border-black"}>
            <p className={"text-xl sm:text-2xl md:text-3xl mb-7"}>You&#39;re not logged in</p>

            <LinkButton
                text={"Log in"}
                href={"/handler/sign-in"}
            ></LinkButton>
            <LinkButton
                text={"Sign up"}
                href={"/handler/sign-up"}></LinkButton>
            </div>
        </div>
    )
}
