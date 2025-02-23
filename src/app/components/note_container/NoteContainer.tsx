import NoteCard from "@/app/components/note_card/NoteCard";
import Month from "@/app/components/month/Month";
import React from "react";

interface NoteContainerProps {
        sortByMonth: boolean
}
// PROPS ARE:
// noteCardClickEventListener
//
const ContainerWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className={"note-container row-span-12 overflow-y-scroll col-span-4 bg-green-400 grid grid-cols-[repeat(auto-fit,minmax(200px,290px))] gap-2 justify-center align-center"}>
            {children}
        </div>
    )
}


const ContainerWrapperMonths = ({children}: {children: React.ReactNode}) => {
    return(
        <div className={"row-span-12 col-span-4 flex flex-nowrap flex-col"}>
            {children}
        </div>
    )
}


const NoteContainer = ({sortByMonth}: NoteContainerProps) => {
    if (sortByMonth) {
        return (<ContainerWrapperMonths>
                    <Month month={"february"}></Month>
            </ContainerWrapperMonths>
                )
        } else {
return (
    <ContainerWrapper>
        <NoteCard
            id={11}
            dateCreated={11}
            dateModified={11}
            status={"in Progress"}
            percentage={66}
            noteContent={"<h1>A separate note card</h1>"}
        ></NoteCard>
            <NoteCard
                id={11}
                dateCreated={11}
                dateModified={11}
                status={"in Progress"}
                percentage={66}
                noteContent={"<h1>A separate note card</h1>"}
            ></NoteCard>
            <NoteCard
                id={11}
                dateCreated={11}
                dateModified={11}
                status={"in Progress"}
                percentage={66}
                noteContent={"<h1>A separate note card</h1>"}
            ></NoteCard>
            <NoteCard
                id={11}
                dateCreated={11}
                dateModified={11}
                status={"in Progress"}
                percentage={66}
                noteContent={"<h1>A separate note card</h1>"}
            ></NoteCard>
            <NoteCard
                id={11}
                dateCreated={11}
                dateModified={11}
                status={"in Progress"}
                percentage={66}
                noteContent={"<h1>A separate note card</h1>"}
            ></NoteCard>
            <NoteCard
                id={11}
                dateCreated={11}
                dateModified={11}
                status={"in Progress"}
                percentage={66}
                noteContent={"<h1>A separate note card</h1>"}
            ></NoteCard>
    </ContainerWrapper>
)}
}

export default NoteContainer;