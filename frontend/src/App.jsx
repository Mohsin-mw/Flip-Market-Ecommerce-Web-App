import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Container, Col } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/index";

function App() {
  return (
    <BrowserRouter>
      <main className="d-flex">
        <div className="w-auto">
          <Sidebar />
        </div>
        <Col className="body">
          <Header />
          <Container>
            <Router />
          </Container>
          <Footer />
        </Col>
      </main>
    </BrowserRouter>
  );
}

export default App;
