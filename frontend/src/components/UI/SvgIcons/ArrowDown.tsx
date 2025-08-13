interface Props {
    width: string;
    height: string;
    fill: string;
}
const ArrowDown: React.FC<Props> = ({...arrow}) => {
    return (
        <svg 
            width={arrow.width}
            height={arrow.height}
            fill={arrow.fill}
            version="1.1" 
            id="Capa_1" 
            viewBox="0 0 199.404 199.404" 
            >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g> 
                <polygon points="199.404,63.993 171.12,35.709 99.702,107.127 28.284,35.709 0,63.993 99.702,163.695 "></polygon> 
            </g>
        </svg>
    );
};
export default ArrowDown; 