const ActiveRoomsSkeleton = () => {
  const tableRows = [];
  for (let i = 0; i < 10; i++) {
    tableRows.push(
      <tr className="odd:bg-hover">
        <td className="p-3">
          <div className="animate-pulse bg-grey1 rounded-md w-36 h-8"></div>
        </td>
        <td className="p-3">
          <div className="animate-pulse bg-grey1 rounded-md w-16 h-8"></div>
        </td>
        <td className="p-3">
          <div className="animate-pulse bg-grey1 rounded-md w-24 h-8"></div>
        </td>
        <td className="p-3">
          <div className="animate-pulse bg-grey1 rounded-md w-24 h-8"></div>
        </td>
        <td className="p-3">
          <div className="animate-pulse bg-grey1 rounded-md w-28 h-8"></div>
        </td>
        <td className="p-3">
          <div className="animate-pulse bg-grey1 rounded-md w-20 h-8"></div>
        </td>
        <td className="p-3">
          <div className="animate-pulse bg-grey1 rounded-md w-12 h-8"></div>
        </td>
      </tr>
    );
  }
  return (
    <div className="lg:mx-48 mt-12 max-lg:mx-3 drop-shadow-xl">
      <div className="rounded-xl md:overflow-hidden overflow-x-auto hideScrollbar">
        <table className="w-full h-full text-lg">
          <thead className="bg-secondary">
            <tr>
              <td className="p-3">Room Name</td>
              <td className="p-3">Participants</td>
              <td className="p-3">Time Left</td>
              <td className="p-3">Difficulty</td>
              <td className="p-3">Status</td>
              <td className="p-3">Action</td>
              <td className="p-3">Invite Code</td>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRoomsSkeleton;
