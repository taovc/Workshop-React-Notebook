import "./Home.css";
import Button from "react-bootstrap/Button";

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome To This Workshop.</p>
      </header>
      <div className="home">
        <Button
          variant="primary"
          onClick={() => {
            window.location.href = "/notes";
          }}
        >
          Go To Notes
        </Button>{" "}
      </div>
    </div>
  );
};

export default Home;
