import { useEffect, useState } from "react";
import { BiAlarm } from "react-icons/bi";

function Timer({ roomData }) {
  const [timer, setTimer] = useState(
    roomData?.settings?.timeLimit * 60 || 40 * 60
  );
  const [roomEnded, setRoomEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let interval;

    const handleTimer = () => {
      if (roomData.startedAt) {
        if (new Date(roomData.expiresAt) < new Date()) {
          setRoomEnded(true);
          setIsLoading(false);
          return;
        }

        const timeLeftInSeconds = Math.floor(
          (new Date(roomData.expiresAt) - Date.now()) / 1000
        );
        setTimer(timeLeftInSeconds);

        interval = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer > 1) {
              return prevTimer - 1;
            } else {
              setRoomEnded(true);
              clearInterval(interval);
              return prevTimer;
            }
          });
        }, 1000);

        setIsLoading(false);
      } else setIsLoading(false);
    };

    roomData && handleTimer();

    return () => clearInterval(interval);
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

  return isLoading ? (
    <div className="w-full p-6 bg-grey1 animate-pulse"></div>
  ) : !roomEnded ? (
    <h1 className="flex flex-row items-center gap-x-3 bg-lightSecondary px-6 py-2 mb-3">
      <BiAlarm className="text-xl" />
      Room ends in
      <span className="bg-accent1 rounded-lg px-3 font-bold">
        {formatTime(timer)}
      </span>
    </h1>
  ) : (
    <h1 className="flex flex-row items-center gap-x-3 bg-hardRed px-6 py-2 mb-3">
      <BiAlarm className="text-xl" />
      Room has ended.
    </h1>
  );
}

export default Timer;
