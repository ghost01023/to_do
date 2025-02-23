import "@/app/globals.css";
import FilterMenu from "@/app/components/filter_menu/FilterMenu";
import Header from "@/app/components/header/Header";
import NoteContainer from "@/app/components/note_container/NoteContainer";

interface DashboardProps {
    username: string
}

const Dashboard = ({username}: DashboardProps) => {
    console.log(username);
    return(
        <div
            className={"h-screen overflow-y-hidden grid grid-cols-5"}>
            <Header username={"Thomas"}></Header>
            {/*<div className={"col-span-5"}></div>*/}
            {/*<div className={"col-span-1"}></div>*/}
            <FilterMenu></FilterMenu>
            <NoteContainer sortByMonth={true}></NoteContainer>
        </div>
    )
}

export default Dashboard;