import {
  FaCamera,
  FaRegTimesCircle,
  FaGithub,
  FaLinkedin,
  FaUserAlt,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../../api/profileDataAPI";
import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../../App";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { userData, setUserData } = useContext(AuthContext);

  const totalEasy = 230;
  const totalMedium = 230;
  const totalHard = 230;
  const fileInputRef = useRef(null);
  const [percentageSolved, setPercentageSolved] = useState([0, 0, 0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [tabActive, switchTab] = useState("Recent Submissions");
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [editing, setEditing] = useState(false);
  const [tags, setTags] = useState(userData?.profile?.skills);
  const [countries, setCountries] = useState([]);

  const params = useParams();
  const username = params.username;
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const countryData = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(() => {
        const names = countryData.data.map((country) => {
          return { name: country.name.common, flag: country.flags.png };
        });
        return names.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
      });
      if (username === userData?.username) {
        setIsMyProfile(true);
        setProfileData(userData.profile);
      } else {
        const response = await getUserProfile(username);
        if (response.profileData) setProfileData(response.profileData);
        else navigate("/notfound", { replace: true });
      }
    };
    loadData();
  }, [navigate]);

  useEffect(() => {
    if (Object.keys(profileData).length !== 0) {
      setPercentageSolved((prev) =>
        prev.map((_, i) => {
          const total = i === 0 ? totalEasy : i === 1 ? totalMedium : totalHard;
          return `${
            profileData.numberOfSubmissions &&
            (profileData?.numberOfSubmissions[i] * 100) / total
          }`;
        })
      );
      if (profileData?.avatar) {
        const imgURL = `data:${profileData?.avatar?.contentType};base64,${profileData?.avatar?.image}`;
        setPreview(imgURL);
        setImageURL(imgURL);
      }
    }
  }, [profileData]);

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

  const updateAvatar = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const checkUploadedFile = (e) => {
    const file = e.target.files[0];
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    if (!file.type.match(imageMimeType)) {
      toast.error("Image mime type is not valid");
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

      try {
        const response = await updateUserProfile(formData);
        setProfileData(response.profileData);
        toast.success("Avatar updated successfully.");
      } catch (err) {
        toast.error("Something went wrong! Please try again.");
      }

      setModalOpen(false);
    } else {
      toast.error("No files uploaded");
    }
  };

  const updateProfile = async () => {
    const arr = Array.from(document.getElementsByClassName("profile-data"));
    const formData = new FormData();
    let data;
    arr.forEach((el) => (data = { ...data, [el.name]: el.value }));
    const modData = {
      about: data.about,
      country: data.country,
      skills: [...tags],
      socials: [data.github_link, data.linkedin_link],
    };

    formData.append("data", JSON.stringify(modData));

    try {
      const response = await updateUserProfile(formData);
      setProfileData(response.profileData);
      toast.success("Profile data updated successfully.");
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  const clearPreview = (e) => {
    e.preventDefault();
    setFile(null);
    setPreview(null);
    setModalOpen(false);
  };

  const addTag = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      const newTag = e.target.value.trim();
      setTags((prevTags) =>
        !prevTags.includes(newTag) ? [...prevTags, newTag] : prevTags
      );
      e.target.value = "";
    } else if (e.key === "Backspace" && e.target.value === "") {
      setTags((prevTags) => prevTags.slice(0, -1));
    }
  };

  const deleteTag = async (e) => {
    const removeEl = e.currentTarget.dataset.tagname;
    setTags((prevTags) => prevTags.filter((element) => element !== removeEl));
  };

  return (
    <div className="flex flex-col w-full px-6 py-4 gap-x-6 grow">
      <div
        className={`modal 
        ${modalOpen ? "scale-100 opacity-1" : "scale-0 opacity-0"} 
        fixed z-[9999] h-[60%] w-[40%] transition-all duration-300 overflow-y-hidden shadow shadow-modal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lightPrimary flex flex-col items-center justify-center gap-y-3 rounded-lg p-6`}
      >
        <div className="rounded-lg w-64 h-64">
          {preview ? (
            <img
              className="w-full h-full object-cover rounded-lg"
              src={preview}
              alt="user-avatar-preview"
            />
          ) : imageURL ? (
            <img
              className="w-full h-full object-cover rounded-lg"
              src={imageURL}
              alt="user-avatar"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
              <FaUserAlt className="text-8xl" />
            </div>
          )}
        </div>
        <form onSubmit={uploadFile} encType="multipart/form-data">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            name="file"
            onChange={checkUploadedFile}
            className="w-64 hidden"
          />
          <button
            onClick={(e) => updateAvatar(e)}
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
            />
            <button
              className="px-6 py-2 bg-grey1 hover:bg-red-500 rounded-lg text-primary hover:cursor-pointer font-bold"
              onClick={(e) => clearPreview(e)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="relative flex flex-row items-center h-20 w-full rounded-3xl mt-10 p-12 bg-secondary">
        <div
          onClick={() => isMyProfile && openAvatarModal()}
          className="modal group absolute flex items-center justify-center w-24 h-24 hover:cursor-pointer rounded-lg overflow-hidden bg-grey2 shadow shadow-heading -top-12 left-1/2 -translate-x-1/2"
        >
          {imageURL ? (
            <img
              className="w-full h-full object-cover"
              src={imageURL}
              alt="profile-pic"
            />
          ) : (
            <FaUserAlt className="text-5xl" />
          )}
          {isMyProfile && (
            <>
              <FaCamera className="absolute group-hover:opacity-100 z-10 opacity-0 transition duration-300 text-5xl" />
              <div className="absolute group-hover:opacity-50 z-10 opacity-0 transition duration-300 bg-gray-400 w-full h-full"></div>
            </>
          )}
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-bold text-white text-xl">
          {profileData?.username}
        </div>
        <div className="mr-auto flex items-center">
          <div className="text-center px-6 mr-6 border-r border-accent3">
            <p>Rooms Joined</p>
            <p className="text-4xl font-bold">
              {profileData?.roomsCreated?.length}
            </p>
          </div>
          <div className="text-center">
            <p>Problems Solved</p>
            <p className="text-4xl font-bold">
              {profileData?.totalSubmissions}
            </p>
          </div>
        </div>
        <div className="ml-auto flex items-center">
          <div className="text-center px-6 mr-6 border-r border-accent3">
            <p>Country</p>
            <div className="flex items-center justify-center gap-x-3">
              {profileData?.country && (
                <img
                  className="w-5 h-5 object-cover overflow-clip rounded-full"
                  src={`${
                    countries?.filter(
                      (country) => country.name === profileData?.country
                    )[0]?.flag
                  }`}
                  alt="country-flag"
                />
              )}
              {editing ? (
                <select
                  className="profile-data focus:outline-none px-3 py-1 rounded-lg bg-primary"
                  defaultValue={profileData?.country}
                  name="country"
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p>
                  {profileData?.country ?? (
                    <span className="text-sm text-grey1">Country</span>
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="text-center flex items-center gap-x-3">
            {profileData?.socials?.map((social, index) => {
              if (social !== "")
                return index === 0 ? (
                  <a
                    href={social}
                    className="hover:text-accent1 transition duration-300"
                  >
                    <FaGithub className="text-4xl" />
                  </a>
                ) : (
                  <a
                    href={social}
                    className="hover:text-accent1 transition duration-300"
                  >
                    <FaLinkedin className="text-4xl" />
                  </a>
                );
              else if (index === 0) {
                return <p className="text-grey1 text-sm">No socials</p>;
              }
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-rows-2 grid-cols-3 gap-6 grow mt-6">
        <div className="row-span-2 bg-secondary rounded-lg p-6">
          <section className="mb-8">
            <h2 className="uppercase font-bold text-xl mb-3 tracking-wider">
              About
            </h2>
            {editing ? (
              <textarea
                maxLength="512"
                name="about"
                className="profile-data w-full h-40 leading-4 rounded-lg bg-lightSecondary focus:outline-none p-3"
              >
                {profileData?.about}
              </textarea>
            ) : (
              <p className="leading-6">
                {profileData?.about || (
                  <span className="text-sm text-grey1">Not updated</span>
                )}{" "}
              </p>
            )}
          </section>
          <section className="mb-8">
            <h2 className="uppercase font-bold text-xl mb-3 tracking-wider">
              Skills
            </h2>
            <div className="flex flex-row gap-3 flex-wrap">
              {editing ? (
                <div className="flex items-center flex-wrap gap-3 p-3 w-full bg-lightSecondary rounded-lg">
                  {tags &&
                    tags?.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center px-3 py-1 bg-primary gap-x-3 rounded-lg"
                      >
                        {tag}
                        <button
                          className="hover:text-accent1 hover:cursor-pointer"
                          data-tagname={tag}
                          onClick={deleteTag}
                        >
                          <FaRegTimesCircle />
                        </button>
                      </div>
                    ))}
                  <input
                    type="text"
                    placeholder="Press enter to add skill..."
                    onKeyDown={addTag}
                    className="bg-transparent focus:outline-none"
                  />
                </div>
              ) : profileData?.skills?.length !== 0 ? (
                profileData?.skills?.map((skill) => (
                  <span key={skill} className="px-3 rounded-lg bg-primary">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="leading-6">
                  <span className="text-sm text-grey1">Not updated</span>
                </p>
              )}
            </div>
          </section>
          {editing && (
            <section className="mb-8">
              <h2 className="uppercase font-bold text-xl mb-3 tracking-wider">
                Socials
              </h2>
              <div className="z-[2] grow">
                <form>
                  <div className="flex items-center gap-x-3 mb-3">
                    <label htmlFor="github-link">
                      <FaGithub className="text-2xl" />
                    </label>
                    <input
                      name="github_link"
                      defaultValue={profileData?.socials[0]}
                      type="text"
                      placeholder="Link to GitHub Profile"
                      className="profile-data px-3 py-1 w-full rounded-lg bg-lightSecondary focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-x-3">
                    <label htmlFor="linkedin-link">
                      <FaLinkedin className="text-2xl" />
                    </label>
                    <input
                      name="linkedin_link"
                      defaultValue={profileData?.socials[1]}
                      type="text"
                      placeholder="Link to LinkedIn Profile"
                      className="profile-data px-3 py-1 w-full rounded-lg bg-lightSecondary focus:outline-none"
                    />
                  </div>
                </form>
              </div>
            </section>
          )}
          <section className="mb-8">
            <h2 className="uppercase font-bold text-xl mb-3 tracking-wider">
              Friends
            </h2>
            {profileData?.friends?.length !== 0 ? (
              <div className="z-[2] grow">
                {profileData?.friends?.map((friend, i) => (
                  <div
                    key={i}
                    className="flex flex-row rounded-xl w-full gap-x-3 items-center p-3 hover:bg-hover hover:cursor-pointer"
                  >
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
            ) : (
              <p className="text-sm text-grey1">No friends yet.</p>
            )}
          </section>
          {isMyProfile && (
            <button
              onClick={() => {
                if (editing) updateProfile();
                setEditing((prev) => !prev);
              }}
              className="bg-greenBackGround hover:bg-emerald-800 mb-6 w-full px-3 py-4 rounded-lg text-green font-bold text-xl"
            >
              {editing ? "Done" : "Edit Profile"}
            </button>
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
                  <div
                    className={`absolute bg-green bottom-0 w-14`}
                    style={{ height: `${percentageSolved[0]}%` }}
                  ></div>
                  <p className="absolute bottom-3 text-center w-full font-bold text-base">
                    {(profileData?.numberOfSubmissions &&
                      profileData.numberOfSubmissions[0]) ||
                      0}
                  </p>
                </div>
                <p>E</p>
              </div>
              <div className="flex flex-col gap-y-1 items-center">
                <p className="font-bold">{totalMedium}</p>
                <div className="h-56 w-14 rounded-xl overflow-clip bg-yellowBackGround relative">
                  <div
                    className={`absolute bg-yellow-500 bottom-0 w-14`}
                    style={{ height: `${percentageSolved[1]}%` }}
                  ></div>
                  <p className="absolute bottom-3 text-center w-full font-bold text-base">
                    {(profileData?.numberOfSubmissions &&
                      profileData.numberOfSubmissions[1]) ||
                      0}
                  </p>
                </div>
                <p>M</p>
              </div>
              <div className="flex flex-col gap-y-1 items-center">
                <p className="font-bold">{totalHard}</p>
                <div className="h-56 w-14 rounded-xl overflow-clip bg-redBackGround relative">
                  <div
                    className={`absolute bg-hardRed bottom-0 w-14`}
                    style={{ height: `${percentageSolved[2]}%` }}
                  ></div>
                  <p className="absolute bottom-3 text-center w-full font-bold text-base">
                    {(profileData?.numberOfSubmissions &&
                      profileData.numberOfSubmissions[2]) ||
                      0}
                  </p>
                </div>
                <p>H</p>
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-col items-center justify-center h-52 w-52 rounded-full border-8 border-accent1 m-auto">
                <p className="font-bold text-5xl">
                  {profileData?.totalSubmissions}
                </p>
                <p>solved</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-secondary rounded-lg p-6">
          <div className="flex flex-row gap-x-3 mb-6">
            <button
              onClick={() => switchTab("Recent Submissions")}
              className={`px-3 py-1 rounded-lg ${
                tabActive === "Recent Submissions" ? "bg-accent3" : ""
              }`}
            >
              Recent Submissions
            </button>
            <button
              onClick={() => switchTab("Created Rooms")}
              className={`px-3 py-1 rounded-lg ${
                tabActive === "Created Rooms" ? "bg-accent3" : ""
              }`}
            >
              Created Rooms
            </button>
          </div>
          <div className="flex flex-col">
            {tabActive === "Recent Submissions" ? (
              <p className="text-grey1 p-3">No submissions yet</p>
            ) : (
              <p className="text-grey1 p-3">No rooms created or joined yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
