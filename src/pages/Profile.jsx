import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit3, FiKey } from "react-icons/fi";
//Components
import profile from "../assets/background/user.png";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { logout, signin } from "../store/userSlice";
import { clearProductId } from "../store/wishlistSlice";
//Functions
import { changePassword, updateName } from "../functions/user";

function Profile() {
  const [value, setValue] = useState({
    name: "",
    newPassword: "",
    cNewPassword: "",
  });
  const [changeName, setChangeName] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const token = localStorage.token;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id, name, username, role } = useSelector(
    (state) => state.userStore.user
  );

  const handleCancle = () => {
    setChangeName(false);
    setChangePass(false);
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  /* func logout for Change password */
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProductId());
    navigate("/");
  };

  const handleSubmit = () => {
    /* ถ้า changeName = true ให้ทำ UpdatName */
    /* ถ้าไม่ใช่ ให้ทำ ChangePassword */
    if (changeName) {
      updateName(token, parseInt(id), value.name)
        .then((res) => {
          dispatch(signin(res.data));
          alert("Update name success!");
          setChangeName(false);
        })
        .catch((err) => {
          console.log("Update name fail!", err);
          alert("Update name fail!");
        });
    } else {
      if (value.newPassword !== value.cNewPassword) {
        alert("Password not match!");
        return;
      }

      changePassword(token, id, value.newPassword)
        .then((res) => {
          alert("Change password success!");
          alert("Please log in again.");
          handleLogout();
        })
        .catch((err) => {
          console.log("Change password fail!", err);
          alert("Change password fail!");
        });
    }
  };

  return (
    <div className="w-full py-20 text-slate-600">
      {/* Card Profile */}
      <div className="w-full h-[500px] md:h-[400px] bg-white mt-32 lg:w-2/4 mx-auto rounded-2xl px-2 lg:px-5 relative drop-shadow-xl">
        {/* Image */}
        <div className="avatar absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="w-24 rounded-full">
            <img src={profile} />
          </div>
        </div>

        {/* Button call form */}
        <div className="w-full pt-20 md:pt-5 flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0">
          <button
            className="btn btn-sm"
            onClick={() => setChangeName(true)}
            disabled={changePass}
          >
            <FiEdit3 />
            Change Name
          </button>
          <button
            className="btn btn-sm"
            onClick={() => setChangePass(true)}
            disabled={changeName}
          >
            <FiKey />
            Change Password
          </button>
        </div>

        {/* Content */}
        <div className="mx-auto text-center space-y-10">
          {/* Detail Profile */}
          <div className="flex flex-col items-center pt-10">
            <h2 className="text-center uppercase flex items-center tracking-wider">
              {username && username}
            </h2>
            <div className="w-[50px] mt-1 border-b-4 border-rose-400 rounded-xl"></div>
          </div>
          {changeName ||
            (changePass == false && (
              <div className="space-y-5 tracking-wider">
                <h4>
                  <span className="text-rose-400 uppercase">user: </span>
                  {username && username}
                </h4>
                <h4>
                  <span className="text-rose-400 uppercase">name: </span>
                  {name && name}
                </h4>
                <h4>
                  <span className="text-rose-400 uppercase">role: </span>
                  {role && role}
                </h4>
              </div>
            ))}

          {/* Form Change name */}
          {changeName && (
            <div className="flex items-center space-x-2 justify-center">
              <h4 className="text-rose-400 uppercase">name:</h4>
              <input
                type="text"
                name="name"
                placeholder="New name"
                className="input input-bordered input-sm w-[150px] max-w-xs"
                onChange={handleChange}
              />
            </div>
          )}

          {/* Form Change password */}
          {changePass && (
            <div className="space-y-5 flex flex-col">
              <div className="flex items-center space-x-2 justify-center">
                <h4 className="text-rose-400 uppercase">New password:</h4>
                <input
                  type="text"
                  name="newPassword"
                  placeholder="New password"
                  className="input input-bordered input-sm w-[150px] max-w-xs"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center space-x-2 justify-center">
                <h4 className="text-rose-400 uppercase">Confirm password:</h4>
                <input
                  type="text"
                  name="cNewPassword"
                  placeholder="Confirm password"
                  className="input input-bordered input-sm w-[150px] max-w-xs"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* button submit form */}
          {(changeName || changePass) && (
            <div className="flex items-center space-x-2 justify-center">
              <button
                className="btn btn-active btn-ghost btn-sm tracking-wider"
                onClick={handleCancle}
              >
                Cancle
              </button>
              <button
                className="btn btn-accent btn-sm tracking-wider text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
