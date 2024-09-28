import jwt from 'jsonwebtoken'
import "dotenv/config"

const authMiddleware = async (req, res, next) => {
   const { token } = req.headers;
   if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized Login Agin" })
   }
   try {
      const token_decode = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = token_decode.id
      // console.log( token_decode)

      next();
   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: "Error" })
   }

}



export default authMiddleware;