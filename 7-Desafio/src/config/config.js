import dotenv from "dotenv"

dotenv.config()

export default {
    mongoUrl: process.env.MONGO_URL,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET
}