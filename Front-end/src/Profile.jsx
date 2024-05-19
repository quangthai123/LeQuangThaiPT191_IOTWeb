import React from "react";
import "./styles/Profile.css";

function Profile() {
  const info = {
    name: "Lê Quang Thái",
    dob: "30/09/2002",
    address: "Hà Nam",
    pNum: "0812078298",
    social: [
      {
        name: "facebook",
        link: "https://www.facebook.com/thaiquangle1234",
      },
      {
        name: "github",
        link: "https://github.com/quangthai123",
      },
    ],
  };

  const getImgSrc = (name) => {
    return `/imgs/sIcons/${name}.png`;
  };
  
  return (
    <div className="pContainer">
      <div className="imgContainer">
        <img src="/imgs/profile/pImg.jpg" alt="" />
      </div>
      <div className="infoContainer">
        <span>{"Full name: " + info.name}</span>
        <span>{"Date of birth: " + info.dob}</span>
        <span>{"Live in: " + info.address}</span>
        <span>{"Phone number: " + info.pNum}</span>
        <span>
          Socials:{" "}
          <div className="sContainer">
            {info.social.map((s) => {
              return (
                <a href={s.link} className="sLink">
                  <img src={getImgSrc(s.name)} alt="" className="sImg" />
                </a>
              );
            })}
          </div>
        </span>
      </div>
    </div>
  );
}

export default Profile;
