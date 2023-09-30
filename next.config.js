/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: '',
    //             port: '',
    //             pathname: '',
    //         }
    //     ]
    // },
    images: {
        domains: []
    },
    experimental: {
        serverActions: true,
    }
}

// const nextConfig = {
//     images: {
//         domains: []
//     }
// }

module.exports = nextConfig
