import { IoMdHome } from "react-icons/io";
import { RxActivityLog } from "react-icons/rx";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoListOutline } from "react-icons/io5";


import { LiaBorderAllSolid } from "react-icons/lia";
import { MdOutlineAutoAwesomeMotion } from "react-icons/md";
import { RiProgress5Line } from "react-icons/ri";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

import { IconType } from "react-icons/lib";


type HomeLink = {
    id: string;
    title: string;
    icon?: IconType; 
    path: string;
};


export const homeLinks: HomeLink[] = [
    {
        id: '0',
        title: 'Home',
        icon: IoMdHome,
        path: '/',
    },
    {
        id: '1',
        title: 'Activities',
        icon: RxActivityLog,
        path: '/activities',
    },
    {
        id: '2',
        title: 'Board',
        icon: MdOutlineSpaceDashboard,
        path: '/board',
    },
    {
        id: '3',
        title: 'List',
        icon: IoListOutline,
        path: '/list',
    },
    {
        id: '4',
        title: 'Settings',
        icon: IoSettingsOutline,
        path: '/settings',
    },
    // {
    //     id: '4',
    //     title: 'Calendar',
    //     path: '/calendar',
    // },
    // {
    //     id: '5',
    //     title: 'Settings',
    //     path: '/settings',
    // }
];

type Overviews = {
    id: string;
    title: string;
    icon: IconType;
    total: number; 
};


export const overviews: Overviews[] = [
    {
        id: '0',
        title: 'All Tasks',
        icon: LiaBorderAllSolid,
        total: 10,
    },
    {
        id: '1',
        title: 'To Do',
        icon: MdOutlineAutoAwesomeMotion,
        total: 10,
    },
    {
        id: '2',
        title: 'In Progress',
        icon: RiProgress5Line,
        total: 10,
    },
    {
        id: '3',
        title: 'Completed',
        icon: IoCheckmarkDoneCircleOutline,
        total: 10,
    },
    // {
    //     id: '4',
    //     title: 'Calendar',
    //     path: '/calendar',
    // },
    // {
    //     id: '5',
    //     title: 'Settings',
    //     path: '/settings',
    // }
];
