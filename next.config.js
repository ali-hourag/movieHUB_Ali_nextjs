/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [

        ],
        // remotePatterns: [
        //     {
        //         protocol: "",
        //         hostname: "",
        //         port: "",
        //         pathname: ""
        //     }
        // ]
    },
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig
