interface Props {
    width: string;
    height: string;
    fill: string;
    
}
const ArrowDown: React.FC<Props> = ({
  width,
  height,
  fill,
  }) => {
    return (
        <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="arrow down"
      style={{ display: "block" }} // važno: uklanja baseline pomeranje
      preserveAspectRatio="xMidYMid meet"
    >
      {/* jednostavna trokutasta strelica prema dole */}
      <path
        d="M6 9l6 6 6-6"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
        /*<svg 
            width={svgData.width}
            height={svgData.height}
            fill={svgData.fill}
            version="1.1" 
            id="Capa_1" 
            viewBox="0 0 199.404 120" //"0 0 199.404 199.404" 
            >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g> 
                <polygon points="199.404,63.993 171.12,35.709 99.702,107.127 28.284,35.709 0,63.993 99.702,163.695 "></polygon> 
            </g>
        </svg>*/
    );
};
export default ArrowDown; 