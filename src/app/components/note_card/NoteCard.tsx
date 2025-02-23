interface NoteCardProps {
    id: number;
    dateCreated: number;
    dateModified: number;
    percentage: number;
    status: string;
    noteContent: string;
}

const NoteCard = ({noteContent}: NoteCardProps) => {
    return(
        <div className={"min-h-50"}>
            {noteContent}
        </div>
    )
}

export default NoteCard;