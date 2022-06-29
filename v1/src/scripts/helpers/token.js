import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id.toString() }, process.env.TOKEN_SECRET, {
    expiresIn: '1w',
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id.toString() },
    process.env.REFRESH_TOKEN_SECRET
  );
};

export { generateAccessToken, generateRefreshToken };
