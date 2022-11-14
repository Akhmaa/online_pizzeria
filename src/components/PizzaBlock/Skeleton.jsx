import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="140" cy="128" r="125" />
        <rect x="2" y="285" rx="10" ry="10" width="280" height="27" />
        <rect x="0" y="329" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="437" rx="10" ry="10" width="91" height="27" />
        <rect x="128" y="430" rx="25" ry="25" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton;
