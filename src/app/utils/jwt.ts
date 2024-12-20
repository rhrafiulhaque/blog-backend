import jwt from "jsonwebtoken";
import config from "../../config";
import { TUser } from "../modules/user/user.interface";

const generateToken = (user: TUser) => {
  const accessToken = jwt.sign(
    { email: user.email, role: user.role, name: user.name },
    config.jwt_access_secret as string,
    {
      expiresIn: config.jwt_access_expiresin,
    }
  );

  const refreshToken = jwt.sign(
    { email: user.email, role: user.role, name: user.name },
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expiresin,
    }
  );

  return { accessToken, refreshToken };
};

export default generateToken;
