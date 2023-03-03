import { FaGithub, FaLinkedin, FaUserAlt } from "react-icons/fa";
import profilePic from "../../assets/profile.jpg";

const Profile = (props) => {
  return (
    <div className="flex flex-col w-full px-6 py-4 gap-x-6 grow">
      <div className="relative flex flex-row items-center h-20 w-full rounded-3xl mt-10 p-12 bg-secondary">
        <div className="absolute w-24 h-24 rounded-lg overflow-hidden bg-secondary shadow shadow-heading -top-12 left-1/2 -translate-x-1/2">
          <img src={profilePic} alt="profile-pic" />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-bold text-xl">
          username
        </div>
        <div className="mr-auto flex items-center">
          <div className="text-center px-6 mr-6 border-r border-accent3">
            <p>Rooms Joined</p>
            <p className="text-4xl font-bold">3</p>
          </div>
          <div className="text-center">
            <p>Problems Solved</p>
            <p className="text-4xl font-bold">263</p>
          </div>
        </div>
        <div className="ml-auto flex items-center">
          <div className="text-center px-6 mr-6 border-r border-accent3">
            <p>Location</p>
            <div className="flex items-center justify-center">
              {/* <img src="" alt="country-flag" /> */}
              <p>India</p>
            </div>
          </div>
          <div className="text-center flex items-center gap-x-3">
            <FaGithub className="text-4xl" />
            <FaLinkedin className="text-4xl" />
          </div>
        </div>
      </div>
      <div className="grid grid-rows-2 grid-cols-3 gap-6 grow mt-6">
        <div className="row-span-2 bg-secondary rounded-lg p-6">
          <section className="mb-6">
            <h2 className="uppercase font-bold text-xl mb-3 tracking-wider">
              About
            </h2>
            <p className="leading-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
              nulla temporibus tempore atque dolores obcaecati minima quibusdam
              placeat. Officiis nobis ullam eveniet quaerat. Earum voluptas non
              officiis explicabo quas unde? Numquam, illum sed adipisci ipsa,
              nobis porro voluptates aliquam eius nulla, quibusdam in architecto
              ducimus ut iure laboriosam ad eos corporis sit. Dolore quaerat ad
              quis provident asperiores hic sed? Facilis, inventore!
            </p>
          </section>
          <section className="mb-6">
            <h2 className="uppercase font-bold text-xl mb-3 tracking-wider">
              Skills
            </h2>
            <div className="flex flex-row gap-3 flex-wrap">
              <span className="px-3 rounded-lg bg-primary">HTML5</span>
              <span className="px-3 rounded-lg bg-primary">CSS3</span>
              <span className="px-3 rounded-lg bg-primary">JavaScript</span>
            </div>
          </section>
          <section className="mb-6">
            <h2 className="uppercase font-bold text-xl mb-3 tracking-wider">
              Friends
            </h2>
            <div className="z-[2] grow">
              <div className="flex flex-row rounded-xl w-full gap-x-3 items-center p-3 hover:bg-hover hover:cursor-pointer">
                <div className="flex flex-row items-center justify-center h-12 w-12 bg-grey2 rounded-full">
                  <FaUserAlt className="text-4xl hover:cursor-pointer" />
                </div>
                <div className="flex flex-col text-white leading-snug">
                  <h2 className="font-bold text-lg">Username</h2>
                  <p>Status</p>
                </div>
              </div>
              <div className="flex flex-row rounded-xl w-full gap-x-3 items-center p-3 hover:bg-hover hover:cursor-pointer">
                <div className="flex flex-row items-center justify-center h-12 w-12 bg-grey2 rounded-full">
                  <FaUserAlt className="text-4xl hover:cursor-pointer" />
                </div>
                <div className="flex flex-col text-white leading-snug">
                  <h2 className="font-bold text-lg">Username</h2>
                  <p>Status</p>
                </div>
              </div>
              <div className="flex flex-row rounded-xl w-full gap-x-3 items-center p-3 hover:bg-hover hover:cursor-pointer">
                <div className="flex flex-row items-center justify-center h-12 w-12 bg-grey2 rounded-full">
                  <FaUserAlt className="text-4xl hover:cursor-pointer" />
                </div>
                <div className="flex flex-col text-white leading-snug">
                  <h2 className="font-bold text-lg">Username</h2>
                  <p>Status</p>
                </div>
              </div>
            </div>
          </section>
          <button className="bg-greenBackGround w-full px-3 py-4 rounded-lg text-green font-bold text-xl">
            Edit Profile
          </button>
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
                <p className="font-bold">230</p>
                <div className="h-56 w-14 rounded-xl bg-greenBackGround relative">
                  <p className="absolute bottom-3 text-center w-full font-bold text-base">
                    0
                  </p>
                </div>
                <p>E</p>
              </div>
              <div className="flex flex-col gap-y-1 items-center">
                <p className="font-bold">230</p>
                <div className="h-56 w-14 rounded-xl bg-yellowBackGround relative">
                  <p className="absolute bottom-3 text-center w-full font-bold text-base">
                    0
                  </p>
                </div>
                <p>M</p>
              </div>
              <div className="flex flex-col gap-y-1 items-center">
                <p className="font-bold">230</p>
                <div className="h-56 w-14 rounded-xl bg-redBackGround relative">
                  <p className="absolute bottom-3 text-center w-full font-bold text-base">
                    0
                  </p>
                </div>
                <p>H</p>
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-col items-center justify-center h-52 w-52 rounded-full border-8 border-accent1 m-auto">
                <p className="font-bold text-5xl">263</p>
                <p>solved</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-secondary rounded-lg p-6">
          <div className="flex flex-row gap-x-3 mb-6">
            <button className="px-3 py-1 rounded-lg bg-accent3">
              Recent Submissions
            </button>
            <button className="px-3 py-1 rounded-lg">Created Rooms</button>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center p-3 rounded-lg odd:bg-hover">
              <p>Problem name</p>
              <p>1 day ago</p>
            </div>
            <div className="flex flex-row justify-between items-center p-3 rounded-lg odd:bg-hover">
              <p>Problem name</p>
              <p>2 days ago</p>
            </div>
            <div className="flex flex-row justify-between items-center p-3 rounded-lg odd:bg-hover">
              <p>Problem name</p>
              <p>3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
