import dogImg from "../assets/home-dog-reading.jpg";

const Home = () => {
  return (
    <section className="home__container">
      <h1>Here, have a nice Dog!</h1>
      <img src={dogImg} alt="dog-reading" />
      <h5>Click the links above to get access to different API</h5>
      <h5>
        Go to the User page and select a user to create or delete comments
      </h5>
    </section>
  );
};
export default Home;
