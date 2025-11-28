interface Props {
    width: string;
    height: string;
    fill: string;
}
const Clock: React.FC<Props> = ({...svgData}) => {
    return (
        <svg
            width={svgData.width}
            height={svgData.height}
            fill={svgData.fill}
            style={{ transform: 'translateY(-1px)'}}
            aria-hidden="true" 
            data-eds-component="true" 
            fillRule="evenodd" 
            focusable="false" 
            preserveAspectRatio="xMidYMid meet" 
            role="img" viewBox="0 0 480 480"><path d="M268 140a18 18 0 0 0-36 0v92h-72a18 18 0 0 0 0 36h90c10 0 18-8 18-18V140Z"></path>
            <path d="M42 240a198 198 0 1 1 396 0 198 198 0 0 1-396 0Zm36 0a162 162 0 1 1 324 0 162 162 0 0 1-324 0Z"></path>
            </svg>
    );
};
export default Clock; 