import { ImCrying } from "react-icons/im";
import { TfiCar } from "react-icons/tfi";

const Error = () => {
  return (
    <div className="error__container">
      <ImCrying size="7rem" />
      <h1>Oops...</h1>
      <h2>Looks like the page doesn't exist</h2>
      <h3>May I suggest you click the links above to view other pages?</h3>
      <h6>Or watch the car moving around.....</h6>
      <TfiCar size="3rem" className="carMotion" />
    </div>
  );
};
export default Error;
