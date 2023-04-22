import { useEffect, useState } from "react";
import { BiAlarm } from "react-icons/bi";

function Timer({ roomData }) {
  const [timer, setTimer] = useState(roomData?.settings.timeLimit * 60 || 10);

  useEffect(() => {
    if (roomData?.hasStarted) {
      //   const timeLeftInSeconds = 120 * 60;
      const timeLeftInSeconds = (roomData?.expiresAt - Date.now()) / 1000;
      console.log(timeLeftInSeconds);
      setTimer(timeLeftInSeconds);
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(interval);
            return prevTimer;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [roomData]);

  function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const hoursString = hours.toString().padStart(2, "0");
    const minutesString = minutes.toString().padStart(2, "0");
    const secondsString = seconds.toString().padStart(2, "0");
    return `${hoursString}:${minutesString}:${secondsString}`;
  }

  return (
    <h1 className="flex flex-row items-center gap-x-3 bg-lightSecondary px-6 py-2 mb-3">
      <BiAlarm className="text-xl" />
      Round ends in
      <span className="bg-accent1 rounded-lg px-3 font-bold">
        {formatTime(timer)}
      </span>
    </h1>
  );
}

export default Timer;
