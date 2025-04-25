import React from "react";
import "../../../globals.css";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      {children}
    </div>
      </body>
    </html>
  );
}