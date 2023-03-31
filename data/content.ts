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
        description: 'Delv is developing the complete suite of decentralized finance. From core infrastructure to structured products, our protocols work together to help create and usher in the new financial system.',
        backgroundClass: 'bg-white',
    },
    {
        id: 'Element',
        title: 'Fixed rate protocol',
        description: 'It all began with Element, an open-source decentralized protocol for fixed and variable yield markets.',
        link: 'https://paper.element.fi/',
        backgroundClass: 'bg-white',
        logo: {
            w: 325,
            h: 64,
        }
    },
    {
        id: 'Council',
        title: 'Council protocol',
        description: 'Council is a decentralized governance system and suite of tools that allows a community to deploy and manage a DAO. It represents a new era of governance innovation, allowing anyone to build adaptable governance systems using the security of on-chain governance while allowing for unprecedented modularity and flexibility.',
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
        description: 'Hyperdrive is the next research leap from Delv on variable and fixed rate primitives. It is an advanced AMM featuring no preset expiration dates, no fragmented liquidity, and no LP rollovers — aka everlasting liquidity.',
        backgroundClass: 'bg-black',
        link: 'https://hyperdrive.element.fi/',
        logo: {
            w: 400,
            h: 174,
        }
    },
    {
        id: 'Echo',
        title: 'Browser-Layer P2P',
        description: 'Echo is a new P2P protocol that focuses on the browser-layer. It enables visitors of web3 applications to peer/host infrastructure needed to power the application. Echo is a natural progression for Council, allowing DAOs to run frontends and data services. It enables a world of truly decentralized protocols and DAOs.',
        backgroundClass: 'bg-black',
        logo: {
            w: 286,
            h: 101,
        }
    },
    {
        id: 'Agent_0',
        title: 'Data Simulation',
        description: 'Agent_0 is a data simulation framework to aid progress on the new Hyperdrive AMM design before implementing it in Solidity. The models include smart agents that allow us to graph/stress test against all scenarios. It will also leverage reinforcement machine learning to further our research endeavors.',
        backgroundClass: 'bg-black',
        logo: {
            w: 400,
            h: 97,
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
        //     "url": "https://github.com/element-fi/brand-assets"
        // },
        {
            "name": "Jobs",
            "url": "https://wellfound.com/company/delv-tech/jobs/"
        }
    ],
    "Community": [
        {
            "name": "Twitter",
            "url": "https://twitter.com/element_fi"
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
            "url": "https://github.com/element-fi"
        },
        {
            "name": "YouTube",
            "url": "https://www.youtube.com/channel/UCwxX4xrw-AZF_7dB7gVMaSw"
        }
    ]
}