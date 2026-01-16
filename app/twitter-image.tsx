import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "#1a1a1a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#f97316",
        fontWeight: "bold",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div>TB</div>
      </div>
      <div
        style={{
          fontSize: 48,
          color: "#e5e5e5",
          marginTop: "20px",
        }}
      >
        个人技术博客
      </div>
    </div>,
    {
      ...size,
    }
  );
}
