import { useState } from "react";

export default function ImageWithSkeleton({
  src,
  alt,
  className = "",
  skeletonClass = "",
  style = {},
  imgStyle = {},
  ...props
}) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className={`relative ${className}`} style={style}>
      {!imgLoaded && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse rounded-xl flex items-center justify-center z-20 ${skeletonClass}`}
        />
      )}
      <img
        src={src}
        alt={alt}
        style={imgStyle}
        className={`w-full h-full object-cover rounded-xl transition ${imgLoaded ? "" : "invisible"}`}
        onLoad={() => setImgLoaded(true)}
        {...props}
      />
    </div>
  );
}