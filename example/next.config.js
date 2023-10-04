/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  transpilePackages: [
    'mui-location-autocomplete',
    '@mui/system',
    '@mui/material',
    '@mui/icons-material',
  ],
  modularizeImports: {
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
    },
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
