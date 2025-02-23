
import NoteCard from "@/app/components/note_card/NoteCard";
// style for month

// .scroll [each month]
// height: 1200px;
// background-image:url(https://assets.codepen.io/210284/snake-1.jpg);
// background-attachment: fixed;
// background-size: cover;
// background-position: center;
// flex-direction: row;
// gap: 1.6em;

// .empty-space [start of each]
// width: 100%;
// min-height: 90vh;
// background-color: #131212;
// display: flex;
// justify-content: center;
// align-items: center;

interface MonthEmptySpaceProps {
    month: string;
    year: number;
}

const MonthEmptySpace = ({month, year}: MonthEmptySpaceProps) => {
    return(
        <div className={"flex-1 month-empty-space bg-gray-700"}>
            <h2>{month}</h2>
            <h3>{year}</h3>
        </div>
    )
}



interface MonthProps {
    month: string;
}
const Month = ({month}: MonthProps) =>
{
    const arr = []
    for(let i = 0; i < 25; i++){
        arr.push(i);
    }
    return (
        <div className={"bg-repeat-y bg-cover bg-top bg-fixed h-full flex flex-row flex-wrap bg-[url('/months/" + month + ".jpg')]"}>
            <MonthEmptySpace month={month} year={2024} />
            {/*FOR LOOP THE NOTES*/}
            {
                arr.map(v => <NoteCard
                    key={v}
                    id={v}
                    dateCreated={v}
                    dateModified={v}
                    status={"doing..."}
                    percentage={v}
                    noteContent={"temporary note content"}
                ></NoteCard>)
            }
        </div>
    )
}
export default Month;