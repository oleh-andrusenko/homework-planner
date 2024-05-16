export const registerUser = async (user) => {
  "use server"
  try {
    const res = await fetch("/api/Users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: user,
    })
    console.log(res)
  } catch (error) {
    console.error(error)
  }
}
