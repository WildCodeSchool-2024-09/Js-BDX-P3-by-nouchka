import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <hgroup>
        <h1>by.Nouchka</h1>
        <img
          className="img-example"
          src="./src/assets/images/IMG_2711.png"
          alt=""
        />
        <p className="text1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          magnam, iure voluptas eius recusandae neque corporis molestias magni
          accusantium dolores quam veniam atque excepturi expedita dicta
          veritatis dolorum quis sunt?
        </p>
        <p className="text2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos natus
          quaerat omnis nihil dignissimos perferendis ullam, et tempora nesciunt
          quas cum necessitatibus dolores quis? Quia veritatis quibusdam sunt
          corporis beatae!
        </p>
      </hgroup>
    </>
  );
}

export default App;
