export const loaderRender = () => `
  <svg style="
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    min-width: 40px;
    max-width: 320px;
    height: 12px;">
    <defs>
      <linearGradient id="loadingGradient" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="#f2f2f2" stop-opacity=".5">
          <animate
          attributeName="stop-color"
          values="#f2f2f2;#ababab;#f2f2f2;"
          dur="1.5s"
          repeatCount="indefinite"
        />
        </stop>
        <stop offset="100%" stop-color="#f2f2f2" stop-opacity=".5">
          <animate
            attributeName="stop-color"
            values="#ababab;#f2f2f2;#ababab;"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>
    </defs>
    <rect style="width: 100%; height: 12px;" fill="url('#loadingGradient')" />
  </svg>
`;
