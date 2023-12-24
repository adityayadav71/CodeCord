import { useEffect, useState } from "react";
import { BiAlarm } from "react-icons/bi";

function Timer({ roomData }) {
  const [timer, setTimer] = useState(roomData?.settings?.timeLimit * 60 || 40 * 60);
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

        const timeLeftInSeconds = Math.floor((new Date(roomData.expiresAt) - Date.now()) / 1000);
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
    <div className="flex sm:flex-row flex-col sm:items-center items-start gap-x-3 gap-y-1 sm:bg-lightSecondary p-0 sm:px-6 sm:py-2 sm:mb-3">
      <div className="flex sm:gap-3 gap-1 items-center">
        <BiAlarm className="text-lg" />
        <p className="text-sm sm:text-base">Room ends in</p>
      </div>
      <span className="bg-accent1 rounded-lg px-3 font-bold">{formatTime(timer)}</span>
    </div>
  ) : (
    <div className="flex sm:gap-3 gap-1 sm:items-center items-start rounded-lg bg-hardRed px-2 py-3 sm:px-6 sm:py-2 sm:mb-3">
      <BiAlarm className="text-lg" />
      <p className="text-sm sm:text-base">Room has ended</p>
    </div>
  );
}

export default Timer;
