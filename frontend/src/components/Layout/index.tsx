import Header from "./Header";

const Layout = ({ children }: { children: any }) => {
  return (
    <div className={"bg-gray-100 dark:bg-gray-800 min-h-screen"}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
