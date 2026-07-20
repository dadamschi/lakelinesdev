import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Web Design & Development Studio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #122c3b 0%, #234557 55%, #24627b 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="140" height="140" viewBox="0 0 64 64" fill="none">
          <path
            d="M27 11 V35 H13"
            stroke="#ffffff"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M37 11 V35 H51"
            stroke="#ffffff"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 45 q5.5 -5 11 0 t11 0 t11 0 t11 0"
            stroke="#80cfe1"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M21 53 q5.5 -5 11 0 t11 0"
            stroke="#80cfe1"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
        </svg>
        <div
          style={{
            marginTop: 40,
            fontSize: 72,
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "-2px",
            display: "flex",
          }}
        >
          Lakelines Dev
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 30,
            color: "#b4e4ee",
            display: "flex",
          }}
        >
          Websites for realtors &amp; builders · HubSpot · SEO
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 22,
            color: "#80cfe1",
            display: "flex",
          }}
        >
          lakelinesdev.com
        </div>
      </div>
    ),
    { ...size }
  );
}
