interface HeaderProps {
    username: string;
}

const Header = ({username}: HeaderProps) => {
    return (
        <div className={"col-span-5 bg-red-400"}>
            <h1>Welcome back {username}</h1>
        </div>
    )
}


export default Header;