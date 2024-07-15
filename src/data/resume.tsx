import { Icons } from '@/components/icons';
import { CodeIcon, HomeIcon, NotebookIcon, PencilLine } from 'lucide-react';

export const DATA = {
  name: 'Hung Nguyen',
  initials: 'HN',
  url: 'https://nthung.net',
  location: 'Ho Chi Minh City, Vietnam',
  locationLink: 'https://www.google.com/maps/place/ho+chi+minh+city,+vietnam',
  description: 'Building applications for the modern age',
  summary:
    'I specialize in crafting high-performance apps while prioritizing user experience. My written work covers modern JavaScript, TypeScript, React, and Node.js.',
  avatarUrl: '/me.png',
  skills: ['React', 'Next.js', 'Remix', 'Typescript', 'Node.js', 'Python', 'Postgres', 'Docker'],
  navbar: [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/blog', icon: NotebookIcon, label: 'Blog' },
    { href: '#', icon: CodeIcon, label: 'Projects' },
    { href: '#', icon: PencilLine, label: 'Notes' },
  ],
  contact: {
    email: 'hello@example.com',
    tel: '+123456789',
    social: {
      GitHub: {
        name: 'GitHub',
        url: 'https://github.com/nthung2112',
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/nthung2112',
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: 'X',
        url: 'https://x.com/nthung2112',
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: 'Youtube',
        url: 'https://www.youtube.com/@nthung2112',
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: 'Send Email',
        url: 'nthung2112@gmail.com',
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: 'NAB VN',
      href: 'https://atomic.finance',
      badges: [],
      location: 'HCM, Vietnam',
      title: 'Senior Frontend Engineer',
      logoUrl: '/nab.png',
      start: 'February, 2021',
      end: '',
      description:
        'Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.',
    },
    {
      company: 'Home Credit VN',
      badges: [],
      href: 'https://www.homecredit.vn/',
      location: 'HCM, Vietnam',
      title: 'Senior Frontend Engineer',
      logoUrl: '/home.png',
      start: 'August, 2018',
      end: 'January, 2021',
      description:
        'Implemented a custom Kubernetes controller in Go to automate the deployment of MySQL and ProxySQL custom resources in order to enable 2,000+ internal developers to instantly deploy their app databases to production. Wrote several scripts in Go to automate MySQL database failovers while maintaining master-slave replication topologies and keeping Zookeeper nodes consistent with changes.',
    },
    {
      company: 'KMS Technology',
      href: 'https://kms-technology.com/',
      badges: [],
      location: 'HCM, Vietnam',
      title: 'Senior Software Engineer',
      logoUrl: '/kms.png',
      start: 'February, 2016',
      end: 'July, 2018',
      description:
        'Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.',
    },
    {
      company: 'KMS Technology',
      href: 'https://kms-technology.com/',
      badges: [],
      location: 'HCM, Vietnam',
      title: 'Software Engineer',
      logoUrl: '/kms.png',
      start: 'October, 2014',
      end: 'February, 2016',
      description:
        'Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.',
    },
  ],
  education: [
    {
      school: 'Buildspace',
      href: 'https://buildspace.so',
      degree: 's3, s4, sf1, s5',
      logoUrl: '/buildspace.jpg',
      start: '2023',
      end: '2024',
    },
    {
      school: 'University of Waterloo',
      href: 'https://uwaterloo.ca',
      degree: "Bachelor's Degree of Computer Science (BCS)",
      logoUrl: '/waterloo.png',
      start: '2016',
      end: '2021',
    },
  ],
  projects: [
    {
      title: 'Chat Collect',
      href: 'https://chatcollect.com',
      dates: 'Jan 2024 - Feb 2024',
      active: true,
      description:
        'With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.',
      technologies: [
        'Next.js',
        'Typescript',
        'PostgreSQL',
        'Prisma',
        'TailwindCSS',
        'Stripe',
        'Shadcn UI',
        'Magic UI',
      ],
      links: [
        {
          type: 'Website',
          href: 'https://chatcollect.com',
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: '',
      video: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4',
    },
    {
      title: 'Magic UI',
      href: 'https://magicui.design',
      dates: 'June 2023 - Present',
      active: true,
      description: 'Designed, developed and sold animated UI components for developers.',
      technologies: [
        'Next.js',
        'Typescript',
        'PostgreSQL',
        'Prisma',
        'TailwindCSS',
        'Stripe',
        'Shadcn UI',
        'Magic UI',
      ],
      links: [
        {
          type: 'Website',
          href: 'https://magicui.design',
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: 'Source',
          href: 'https://github.com/magicuidesign/magicui',
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: '',
      video: 'https://cdn.magicui.design/bento-grid.mp4',
    },
    {
      title: 'llm.report',
      href: 'https://llm.report',
      dates: 'April 2023 - September 2023',
      active: true,
      description:
        'Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.',
      technologies: [
        'Next.js',
        'Typescript',
        'PostgreSQL',
        'Prisma',
        'TailwindCSS',
        'Shadcn UI',
        'Magic UI',
        'Stripe',
        'Cloudflare Workers',
      ],
      links: [
        {
          type: 'Website',
          href: 'https://llm.report',
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: 'Source',
          href: 'https://github.com/dillionverma/llm.report',
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: '',
      video: 'https://cdn.llm.report/openai-demo.mp4',
    },
    {
      title: 'Automatic Chat',
      href: 'https://automatic.chat',
      dates: 'April 2023 - March 2024',
      active: true,
      description:
        'Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.',
      technologies: [
        'Next.js',
        'Typescript',
        'PostgreSQL',
        'Prisma',
        'TailwindCSS',
        'Shadcn UI',
        'Magic UI',
        'Stripe',
        'Cloudflare Workers',
      ],
      links: [
        {
          type: 'Website',
          href: 'https://automatic.chat',
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: '',
      video: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4',
    },
  ],
  hackathons: [
    {
      title: 'Hack The North',
      dates: 'September 14th - 16th, 2018',
      location: 'Waterloo, Ontario',
      description:
        'Developed a mobile application which delivers university campus wide events in real time to all students.',
      image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png',
      mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg',
      links: [],
    },
    {
      title: 'Open Source Circular Economy Days Hackathon',
      dates: 'June 10th, 2017',
      location: 'Toronto, Ontario',
      description:
        "Developed a custom admin interface for food waste startup <a href='http://genecis.co/'>Genecis</a> to manage their data and provide analytics.",
      image:
        'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/open-source-circular-economy-days.jpg',
      win: '1st Place Winner',
      links: [
        {
          title: 'Source',
          icon: <Icons.github className="h-4 w-4" />,
          href: 'https://github.com/dillionverma/genecis',
        },
      ],
    },
    {
      title: 'Waterloo Equithon',
      dates: 'May 5th - 7th, 2017',
      location: 'Waterloo, Ontario',
      description:
        'Developed Pocketdoc, an app in which you take a picture of a physical wound, and the app returns common solutions or cures to the injuries or diseases.',
      image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/waterloo-equithon.png',
      links: [
        {
          title: 'Devpost',
          icon: <Icons.globe className="h-4 w-4" />,
          href: 'https://devpost.com/software/pocketdoc-react-native',
        },
        {
          title: 'YouTube',
          icon: <Icons.youtube className="h-4 w-4" />,
          href: 'https://www.youtube.com/watch?v=XwFdn5Rmx68',
        },
        {
          title: 'Source',
          icon: <Icons.github className="h-4 w-4" />,
          href: 'https://github.com/dillionverma/pocketdoc-react-native',
        },
      ],
    },
    {
      title: 'SpaceApps Waterloo',
      dates: 'April 28th - 30th, 2017',
      location: 'Waterloo, Ontario',
      description:
        'Developed Earthwatch, a web application which allows users in a plane to virtually see important points of interest about the world below them. They can even choose to fly away from their route and then fly back if they choose. Special thanks to CesiumJS for providing open source world and plane models.',
      image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/space-apps.png',
      links: [
        {
          title: 'Source',
          icon: <Icons.github className="h-4 w-4" />,
          href: 'https://github.com/dillionverma/earthwatch',
        },
      ],
    },
  ],
} as const;
