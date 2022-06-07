import Header from "../Header/Header";

const Layout = (props) => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <main>{props.children}</main>
      </div>
    </>
  );
};

export default Layout;
