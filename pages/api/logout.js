import { magicAdmin } from "../../lib/magic";
import { removeTokenCookie } from "../../lib/cookies";
import { verifyToken } from "../../lib/utils";

export default async function logout(req, res) {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({ message: "User is not logged in" });
    }

    const token = req.cookies.token;
    const userId = await verifyToken(token);
    removeTokenCookie(res);

    try {
      await magicAdmin.users.logoutByIssuer(userId);
    } catch (error) {
      console.log("User's session with magic has been expired");
      console.error("Error occurred while logging out magic user", error);
    }

    //redirect users to login
    res.writeHead(302, { location: "/login" });
    res.end;
  } catch (error) {
    console.log({ error });
    res.status(401).json({ message: "User is not logged in" });
  }
}
