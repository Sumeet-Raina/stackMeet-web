import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice.js";

const UserCard = ({ user }) => {
  const {
    _id: userId,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills,
  } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    user && (
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="user photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <p>Skills: {skills}</p>
          <div className="card-actions justify-end my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", userId)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", userId)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
