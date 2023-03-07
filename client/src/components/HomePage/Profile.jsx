import { FaEdit, FaGithub, FaLinkedin, FaUserAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getUserData } from "../../api/profileDataAPI";
import { useEffect, useState } from "react";

const Profile = () => {
  const totalEasy = 230;
  const totalMedium = 230;
  const totalHard = 230;
  const [percentageSolved, setPercentageSolved] = useState([
    <div className="bg-green bottom-0 w-14 h-0"></div>,
    <div className="bg-mediumYellow bottom-0 w-14 h-0"></div>,
    <div className="bg-hardRed bottom-0 w-14 h-0"></div>,
  ]);
  const [userData, setUserData] = useState({});
  const [tabActive, switchTab] = useState("Recent Submissions");
  const [isMyProfile, setIsMyProfile] = useState(false);
  const params = useParams();
  const username = params.username;

  useEffect(() => {
    if (username === localStorage.getItem("username")) {
      setIsMyProfile(true);
    }
    const loadData = async () => {
      const response = await getUserData(username);
      setUserData(response.userData);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      setPercentageSolved((prev) =>
        prev.map((data, i) => {
          const total = i === 0 ? totalEasy : i === 1 ? totalMedium : totalHard;
          return <div className={`bg-hardRed bottom-0 w-14 h-[${(userData?.numberOfSubmissions[i] * 100) / total}%]`}></div>;
        })
      );
    }
  }, [userData]);

  const updateAvatar = async () => {
    
  }

  return (
    <div className="flex flex-col w-full px-6 py-4 gap-x-6 grow">
      <div className="relative flex flex-row items-center h-20 w-full rounded-3xl mt-10 p-12 bg-secondary">
        <div className="group absolute flex items-center justify-center w-24 h-24 hover:cursor-pointer rounded-lg overflow-hidden bg-grey2 shadow shadow-heading -top-12 left-1/2 -translate-x-1/2">
          {userData?.avatar ? <img src={userData?.avatar} alt="profile-pic" /> : <FaUserAlt className="text-5xl" />}
          {isMyProfile && (
            <>
              <div onClick={updateAvatar} className="group-hover:opacity-50 opacity-0 transition duration-300 absolute bg-gray-400 w-full h-full"></div>
              <FaEdit className="absolute translate-x-1 group-hover:opacity-100 opacity-0 transition duration-300 text-secondary text-2xl"/>
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
