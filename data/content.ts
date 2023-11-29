export type Section = {
    id: string
    layout?: 'main' | 'section' | 'footer' | 'about'
    title: string
    description: string
    link?: string
    hidden?: boolean
    backgroundClass: string
    logo?: {
        w: number
        h: number
    }
}

export const sections: Section[] = [
    {
        id: 'Delv',
        layout: 'main',
        title: 'The Factory for DeFi',
        description: 'DELV is building the complete suite of decentralized finance. From core infrastructure to structured products, our protocols work together to help create and usher in the new financial system.',
        backgroundClass: 'bg-white',
    },
    {
        id: 'Element',
        title: 'Fixed rate protocol',
        description: 'It all began with an open-source protocol for fixed and variable yield markets, originally called Element.',
        backgroundClass: 'bg-white',
        logo: {
            w: 325,
            h: 64,
        }
    },
    {
        id: 'Council',
        title: 'Council protocol',
        description: 'The time to govern then came with Council, a decentralized governance system and a suite of tools that allow a community to deploy and manage a DAO. With Council in place, on March 31, 2022, the team would relinquish control of the Element Protocol to the community.',
        link: 'https://council.element.fi/',
        backgroundClass: 'bg-black',
        logo: {
            w: 400,
            h: 52,
        }
    },
    {
        id: 'Elfiverse',
        title: 'NFTs meet DeFi',
        description: 'The lore of the Element DAO was born with Elfiverse – an endeavor to intersect the DeFi and NFT worlds while catalyzing network effects and community building. Elfiverse pushes the boundaries of on-chain governance allowing communities to look beyond the 1-token-1-vote system, driving inclusive governance participation for all.',
        link: 'https://elfiverse.element.fi/',
        backgroundClass: 'bg-black',
        logo: {
            w: 384,
            h: 72,
        }
    },
    {
        id: 'Hyperdrive',
        title: 'A new way to trade rates',
        description: 'Hyperdrive is the next research leap from DELV on variable and fixed rate primitives. It is an advanced AMM featuring no preset expiration dates, no fragmented liquidity, and no LP rollovers — aka everlasting liquidity.',
        backgroundClass: 'bg-black',
        logo: {
            w: 400,
            h: 174,
        }
    },
    {
        id: 'Build',
        hidden: true,
        layout: 'about',
        title: 'Build with us',
        description: 'Let’s reimagine the future of finance together.',
        backgroundClass: 'bg-black',
    }
]

export const Links: {
    [key: string]: {
        name: string;
        url: string;
    }[];
} = {
    "Build": [
        {
            "name": "Bug bounty",
            "url": "https://immunefi.com/bounty/elementfinance/"
        },
        // {
        //     "name": "Brand assets",
        //     "url": "https://github.com/delvtech/brand-assets"
        // },
        {
            "name": "Jobs",
            "url": "https://wellfound.com/company/delv-tech/jobs/"
        }
    ],
    "Community": [
        {
            "name": "Twitter",
            "url": "https://twitter.com/delv_tech"
        },
        {
            "name": "Discord",
            "url": "https://discord.gg/EEfKmfQdtx"
        },
        {
            "name": "Blog",
            "url": "https://blog.element.fi/"
        },
        {
            "name": "Github",
            "url": "https://github.com/delvtech"
        },
        {
            "name": "YouTube",
            "url": "https://www.youtube.com/channel/UCwxX4xrw-AZF_7dB7gVMaSw"
        }
    ]
}