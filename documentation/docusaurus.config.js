// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'SmartTS SDK',
    tagline: 'SmartTS SDK is a metaprogramming framework for building Tezos smart contracts from Javascript.',
    url: 'https://github.com',
    baseUrl: process.env.NODE_ENV === 'development' ? '/' : '/smartts-sdk/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'RoMarQ',
    projectName: 'smartts-sdk',
    trailingSlash: false,

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/RomarQ/smartts-sdk/tree/main/documentation/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            colorMode: {
                defaultMode: 'dark',
            },
            navbar: {
                title: 'SmartTS SDK',
                items: [
                    {
                        href: 'https://github.com/RomarQ/smartts-sdk',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
