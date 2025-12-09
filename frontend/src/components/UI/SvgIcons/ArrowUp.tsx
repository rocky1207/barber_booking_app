interface Props {
    width: string;
    height: string;
    fill: string;
}
const ArrowUp: React.FC<Props> = ({
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
          aria-label="arrow up"
          style={{ display: "block" }} // uklanja baseline pomeranje
          preserveAspectRatio="xMidYMid meet"
        >
      {/* chevron/up arrow */}
      <path
        d="M6 15l6-6 6 6"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
    /*
        <svg
        <path
  d="M6 15l6-6 6 6"
  stroke={fill}
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  fill="none"
/>


            width={svgData.width}
            height={svgData.height}
            fill={svgData.fill}
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
        */
    );
};
export default ArrowUp; 