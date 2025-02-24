interface SyncIconProps {
    syncing: boolean;
}
export const SyncIcon = ({syncing}: SyncIconProps) => {
    if (syncing) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"
                 className={"shape-rendering-auto block bg-transparent"}
                 width="25px" height="25px"
            >
                <g>
                    <circle strokeDasharray="188.49555921538757 64.83185307179586" r="40" strokeWidth="10"
                            stroke="#0099e5" fill="none" cy="50" cx="50">
                        <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1.4285714285714284s"
                                          repeatCount="indefinite" type="rotate"
                                          attributeName="transform"></animateTransform>
                    </circle>
                    <g></g>
                </g>
            </svg>
        )
    } else {
        return (<></>)
    }
}
