import { FaCamera, FaGithub, FaLinkedin, FaUserAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getUserData } from "../../api/profileDataAPI";
import { useEffect, useState, useRef } from "react";
import { updateUserProfile } from "../../api/profileDataAPI";

const Profile = () => {
  const totalEasy = 230;
  const totalMedium = 230;
  const totalHard = 230;
  const [percentageSolved, setPercentageSolved] = useState([
    <div className="bg-green bottom-0 w-14 h-0"></div>,
    <div className="bg-mediumYellow bottom-0 w-14 h-0"></div>,
    <div className="bg-hardRed bottom-0 w-14 h-0"></div>,
  ]);
  const fileInputRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [userData, setUserData] = useState({});
  const [tabActive, switchTab] = useState("Recent Submissions");
  const [isMyProfile, setIsMyProfile] = useState(false);
  const params = useParams();
  const username = params.username;
  const navigate = useNavigate();

  useEffect(() => {
    if (username === localStorage.getItem("username")) {
      setIsMyProfile(true);
    }
    const loadData = async () => {
      const response = await getUserData(username);
      if (response.userData) setUserData(response.userData);
      else navigate("/notfound", { replace: true });
    };
    loadData();
  }, []);

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      setPercentageSolved((prev) =>
        prev.map((_, i) => {
          const total = i === 0 ? totalEasy : i === 1 ? totalMedium : totalHard;
          return <div className={`bg-hardRed bottom-0 w-14 h-[${(userData?.numberOfSubmissions[i] * 100) / total}%]`}></div>;
        })
      );
      if (userData.avatar) {
        const imgURL = `data:${userData?.avatar?.contentType};base64,${userData?.avatar?.image}`;
        setPreview(imgURL);
        setImageURL(imgURL);
      }
    }
  }, [userData]);

  useEffect(() => {
    const closeDropDown = (event) => {
      if (!event.target.closest(".modal")) {
        setModalOpen(false);
      }
    };
    document.addEventListener("click", closeDropDown);
    return () => {
      document.removeEventListener("click", closeDropDown);
    };
  }, []);

  const openAvatarModal = () => {
    setModalOpen((prev) => !prev);
  };

  const updateAvatar = () => {
    fileInputRef.current.click();
  };

  const checkUploadedFile = (e) => {
    const file = e.target.files[0];
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
    if (file) {
      setFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const uploadFile = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify({ username: username }));

      await updateUserProfile(formData);

      const response = await getUserData(username);
      if (response.userData) setUserData(response.userData);
      
      setModalOpen(false);
    } else {
      alert("No files uploaded");
    }
  };

  const clearPreview = () => {
    setModalOpen(false);
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="flex flex-col w-full px-6 py-4 gap-x-6 grow">
      <div
        className={`modal 
        ${modalOpen ? "scale-100 opacity-1" : "scale-0 opacity-0"} 
        fixed z-[9999] h-[60%] w-[40%] transition-all overflow-y-hidden shadow shadow-modal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lightPrimary flex flex-col items-center justify-center gap-y-3 rounded-lg p-6`}
      >
        <div className="rounded-lg w-64 h-64">
          {preview ? (
            <img className="w-full h-full object-cover rounded-lg" src={preview} alt="user-avatar-preview" />
          ) : userData?.avatar ? (
            <img className="w-full h-full object-cover rounded-lg" src={imageURL} alt="user-avatar" />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
              <FaUserAlt className="text-8xl" />
            </div>
          )}
        </div>
        <form onSubmit={uploadFile} encType="multipart/form-data">
          <input type="file" accept="image/*" ref={fileInputRef} name="file" onChange={checkUploadedFile} className="w-64 hidden" />
          <button
            onClick={(e) => {
              e.preventDefault();
              updateAvatar();
            }}
            className="flex items-center justify-center w-full gap-x-3 bg-accent1 hover:cursor-pointer hover:bg-lightAccent1 px-6 py-2 font-bold rounded-lg"
          >
            <FaCamera />
            Upload image
          </button>
          <div className="flex flex-row items-center justify-end w-full gap-x-3 mt-6">
            <input
              type="submit"
              name="submit"
              value="Save"
              className="px-6 py-2 bg-grey1 hover:bg-easyGreen transition-all duration-300 rounded-lg text-primary hover:cursor-pointer font-bold"
            ></input>
            <button
              className="px-6 py-2 bg-grey1 hover:bg-red-500 rounded-lg text-primary hover:cursor-pointer font-bold"
              onClick={(e) => {
                e.preventDefault();
                clearPreview();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="relative flex flex-row items-center h-20 w-full rounded-3xl mt-10 p-12 bg-secondary">
        <div
          onClick={() => {
            if (isMyProfile) openAvatarModal();
          }}
          className="modal group absolute flex items-center justify-center w-24 h-24 hover:cursor-pointer rounded-lg overflow-hidden bg-grey2 shadow shadow-heading -top-12 left-1/2 -translate-x-1/2"
        >
          {userData?.avatar ? <img className="w-full h-full object-cover" src={imageURL} alt="profile-pic" /> : <FaUserAlt className="text-5xl" />}
          {isMyProfile && (
            <>
              <FaCamera className="absolute group-hover:opacity-100 z-10 opacity-0 transition duration-300 text-5xl" />
              <div className="absolute group-hover:opacity-50 -z-10 opacity-0 transition duration-300 bg-gray-400 w-full h-full"></div>
            </>
          )}
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-bold text-xl">{userData?.username}</div>
        <div className="mr-auto flex items-center">
          <div className="text-center px-6 mr-6 border-r border-accent3">
            <p>Rooms Joined</p>
            <p className="text-4xl font-bold">{userData?.roomsCreated?.length}</p>
          </div>
          <div className="text-center">
            <p>Problems Solved</p>
            <p className="text-4xl font-bold">{userData?.totalSubmissions}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center">
          <div className="text-center px-6 mr-6 border-r border-accent3">
            <p>Location</p>
            <div className="flex items-center justify-center">
              {/* <img src="" alt="country-flag" /> */}
              <p>{userData?.country ?? "Country"}</p>
            </div>
          </div>
          <div className="text-center flex items-center gap-x-3">
            {userData?.socials?.forEach((social) => {
              social.name === "GitHub" ? (
                <a href={social.link}>
                  <FaGithub className="text-4xl" />
                </a>
              ) : (
                <a href={social.link}>
                  <FaLinkedin className="text-4xl" />
                </a>
              );
            }) || <p className="text-grey1 text-sm">No socials</p>}
          </div>
        </div>
      </div>
      <div className="grid grid-rows-2 grid-cols-3 gap-6 grow mt-6">
        <div className="row-span-2 bg-secondary rounded-lg p-6">
          <section className="mb-6">
            <h2 className="uppercase font-bold text-xl mb-3 tracking-wider">About</h2>
            <p className="leading-6">{userData?.about || <span className="text-sm text-grey1">Not updated</span>} </p>
          </section>
          {isMyProfile && <button className="bg-greenBackGround mb-6 w-full px-3 py-4 rounded-lg text-green font-bold text-xl">Edit Profile</button>}
          <section className="mb-6">
            <h2 className="uppercase font-bold text-xl mb-3 tracking-wider">Skills</h2>
            <div className="flex flex-row gap-3 flex-wrap">
              {userData?.skills?.map((skill) => <span className="px-3 rounded-lg bg-primary">{skill}</span>) || <p className="text-sm text-grey1">Not updated</p>}
            </div>
          </section>
          {userData?.friends?.length !== 0 && (
            <section className="mb-6">
              <h2 className="uppercase font-bold text-xl mb-3 tracking-wider">Friends</h2>
              <div className="z-[2] grow">
                {userData.friends?.map((friend) => (
                  <div className="flex flex-row rounded-xl w-full gap-x-3 items-center p-3 hover:bg-hover hover:cursor-pointer">
                    <div className="flex flex-row items-center justify-center h-12 w-12 bg-grey2 rounded-full">
                      <FaUserAlt className="text-4xl hover:cursor-pointer" />
                    </div>
                    <div className="flex flex-col text-white leading-snug">
                      <h2 className="font-bold text-lg">{friend?.username}</h2>
                      <p>{friend?.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <div className="row-span-1 bg-secondary rounded-lg p-6 flex flex-col">
          <div className="grid grid-rows-1 grid-cols-4 gap-x-1">
            <div>
              <h1 className="text-grey1 font-bold">Contest Rating</h1>
              <p className="font-bold text-2xl">324</p>
            </div>
            <div>
              <h className="text-grey1 text-sm">Contest</h>
              <p className="text-sm">Weekly Contest 1</p>
            </div>
            <div>
              <h className="text-grey1 text-sm">Rank</h>
              <p className="text-sm">1/360</p>
            </div>
            <div>
              <h className="text-grey1 text-sm">Problems Solved</h>
              <p className="text-sm">4/4 00:16:04</p>
            </div>
          </div>
          <div className="grow"></div>
        </div>
        <div className="row-span-1 bg-secondary rounded-lg p-6 flex flex-col">
          <h1 className="text-grey1 font-bold">Solved Problems</h1>
          <div className="flex flex-row items-center justify-center w-full grow">
            <div className="flex flex-row items-center justify-center gap-x-6 grow">
              <div className="flex flex-col gap-y-1 items-center">
                <p className="font-bold">{totalEasy}</p>
                <div className="h-56 w-14 rounded-xl overflow-clip bg-greenBackGround relative">
                  <div className={`absolute bg-green bottom-0 w-14 h-[${userData.numberOfSubmissions && (userData?.numberOfSubmissions[0] * 100) / totalEasy}%]`}></div>
                  <p className="absolute bottom-3 text-center w-full font-bold text-base">{(userData.numberOfSubmissions && userData.numberOfSubmissions[0]) || 0}</p>
                </div>
                <p>E</p>
              </div>
              <div className="flex flex-col gap-y-1 items-center">
                <p className="font-bold">{totalMedium}</p>
                <div className="h-56 w-14 rounded-xl overflow-clip bg-yellowBackGround relative">
                  <div className={`absolute bg-mediumYellow bottom-0 w-14 h-[${userData.numberOfSubmissions && (userData.numberOfSubmissions[1] * 100) / totalMedium}%]`}></div>
                  <p className="absolute bottom-3 text-center w-full font-bold text-base">{(userData.numberOfSubmissions && userData.numberOfSubmissions[1]) || 0}</p>
                </div>
                <p>M</p>
              </div>
              <div className="flex flex-col gap-y-1 items-center">
                <p className="font-bold">{totalHard}</p>
                <div className="h-56 w-14 rounded-xl overflow-clip bg-redBackGround relative">
                  <div className={`absolute bg-hardRed bottom-0 w-14 h-[${userData.numberOfSubmissions && (userData?.numberOfSubmissions[2] * 100) / totalHard}%]`}></div>
                  <p className="absolute bottom-3 text-center w-full font-bold text-base">{(userData.numberOfSubmissions && userData.numberOfSubmissions[2]) || 0}</p>
                </div>
                <p>H</p>
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-col items-center justify-center h-52 w-52 rounded-full border-8 border-accent1 m-auto">
                <p className="font-bold text-5xl">{userData?.totalSubmissions}</p>
                <p>solved</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-secondary rounded-lg p-6">
          <div className="flex flex-row gap-x-3 mb-6">
            <button onClick={() => switchTab("Recent Submissions")} className={`px-3 py-1 rounded-lg ${tabActive === "Recent Submissions" ? "bg-accent3" : ""}`}>
              Recent Submissions
            </button>
            <button onClick={() => switchTab("Created Rooms")} className={`px-3 py-1 rounded-lg ${tabActive === "Created Rooms" ? "bg-accent3" : ""}`}>
              Created Rooms
            </button>
          </div>
          <div className="flex flex-col">
            {tabActive === "Recent Submissions" ? <p className="text-grey1 p-3">No submissions yet</p> : <p className="text-grey1 p-3">No rooms created or joined yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
