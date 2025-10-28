const ratelimit =require("../config/upstash");

const rateLimiter = async(req, res, next) => {
    try {
        const {sucess} = await ratelimit.limit("my-rate-limit");
        if(!sucess) {
            return res.status(429).json({
                message: "Too man requests, pls again later"
            })
        } 
        next();
        } catch(err) {
          console.log("Rate limi error", err);
          next(err);
    }
}
module.exports = rateLimiter;