import "@styles/global.css";

export const metadata = {
  title: "Promptia",
  description: "Discover and Share AI Prompts",
};

export const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
          <main className="app">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
