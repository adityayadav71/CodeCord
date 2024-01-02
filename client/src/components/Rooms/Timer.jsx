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
    <div className="flex items-center gap-x-3 gap-y-1">
      <div className="flex gap-3 items-center">
        <BiAlarm className="text-lg" />
        <p className="text-base">Round ends in</p>
      </div>
      <span className="bg-accent1 rounded-lg px-3 font-bold">
        {formatTime(timer)}
      </span>
    </div>
  ) : (
    <div className="flex gap-3 items-center rounded-lg bg-hardRed px-3 py-1">
      <BiAlarm className="text-lg" />
      <p className="text-sm">Round has ended</p>
    </div>
  );
}

export default Timer;
