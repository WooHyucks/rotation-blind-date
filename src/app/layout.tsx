import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "로테이션 소개팅 데모",
  description: "카페 프라이빗 네트워크 - 로테이션 소개팅 서비스 데모",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Critical Inline CSS for immediate spinner rendering */}
        <style dangerouslySetInnerHTML={{ __html: `
          #initial-loader {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background-color: #FFE5E1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;
            transition: opacity 0.5s ease-out, visibility 0.5s;
          }
          .spinner-container {
            position: relative;
            padding: 32px;
            background-color: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid white;
            border-radius: 48px;
            box-shadow: 0 20px 50px rgba(251, 113, 133, 0.1);
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(251, 113, 133, 0.1);
            border-left-color: #f43f5e;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .loader-text {
            text-align: center;
            font-family: sans-serif;
          }
          .loader-title {
            font-weight: 900;
            letter-spacing: -0.05em;
            font-size: 20px;
            color: #1c1917;
            margin-bottom: 4px;
          }
          .loader-sub {
            font-weight: 900;
            font-size: 10px;
            letter-spacing: 0.3em;
            color: rgba(159, 18, 57, 0.4);
            text-transform: uppercase;
          }
          .loader-hide {
            opacity: 0;
            visibility: hidden;
          }
        `}} />
      </head>
      <body className="antialiased">
        {/* Immediate Loading Spinner (Priority #1) */}
        <div id="initial-loader">
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
          <div className="loader-text">
            <div className="loader-title">LOADING</div>
            <div className="loader-sub">ROTATION DEMO</div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
