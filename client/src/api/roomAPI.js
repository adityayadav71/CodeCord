export const createSocket = async (settings) => {
  await axios.post("/api/v1/rooms/", JSON.stringify({
      owner,
      settings
    })
  )
}