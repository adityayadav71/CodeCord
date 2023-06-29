import { useEffect, useState } from "react";
import { BiAlarm } from "react-icons/bi";

function Timer({ roomData }) {
  const [timer, setTimer] = useState(
    roomData?.settings?.timeLimit * 60 || 40 * 60
  );
  const [roomEnded, setRoomEnded] = useState(false);

  useEffect(() => {
    if (roomData?.startedAt) {
      const timeLeft =
        (new Date(roomData.expiresAt).getTime() - Date.now()) / 1000;
      const timeLeftInSeconds =
        timeLeft < Date.now() ? timeLeft : setRoomEnded(true);
      setTimer(timeLeftInSeconds);
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setRoomEnded(true);
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

  return !roomEnded ? (
    <h1 className="flex flex-row items-center gap-x-3 bg-lightSecondary px-6 py-2 mb-3">
      <BiAlarm className="text-xl" />
      Round ends in
      <span className="bg-accent1 rounded-lg px-3 font-bold">
        {formatTime(timer)}
      </span>
    </h1>
  ) : (
    <h1 className="flex flex-row items-center gap-x-3 bg-hardRed px-6 py-2 mb-3">
      <BiAlarm className="text-xl" />
      Round has ended.
    </h1>
  );
}

export default Timer;
