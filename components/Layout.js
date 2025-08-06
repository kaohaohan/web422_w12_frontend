import MainNav from "./MainNav";
import Container from "react-bootstrap/Container";

function Layout(props) {
  return (
    <>
      <MainNav />
      <br />
      <Container>{props.children}</Container>
      <br />
    </>
  );
}

export default Layout;
