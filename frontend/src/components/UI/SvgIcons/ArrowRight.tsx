interface Props {
    width: string;
    height: string;
    fill: string;
    
}
const ArrowRight: React.FC<Props> = ({
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
       <g transform="rotate(275 12 12)">
      <path
        d="M6 9l6 6 6-6"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      </g>
    </svg>
    );
};
export default ArrowRight; 