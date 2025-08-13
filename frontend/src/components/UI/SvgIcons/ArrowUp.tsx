interface Props {
    width: string;
    height: string;
    fill: string;
}
const ArrowUp: React.FC<Props> = ({...arrow}) => {
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
                <polygon points="0,135.411 28.285,163.695 99.703,92.277 171.119,163.695 199.404,135.412 99.703,35.709" />
            </g>
        </svg>
    );
};
export default ArrowUp; 