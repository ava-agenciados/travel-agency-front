export default function Skeleton({ width = "100%", height = "16px", circle = false, className = "" }) {
  return (
    <div
      className={`bg-gray-200 animate-pulse ${className}`}
      style={{
        width,
        height,
        borderRadius: circle ? "50%" : "8px",
        display: "inline-block"
      }}
    />
  );
}