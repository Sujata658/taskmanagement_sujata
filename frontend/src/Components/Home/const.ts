import { LiaBorderAllSolid } from "react-icons/lia";
import { MdOutlineAutoAwesomeMotion } from "react-icons/md";
import { RiProgress5Line } from "react-icons/ri";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

import { IconType } from "react-icons/lib";


type Overviews = {
    id: string;
    title: string;
    icon: IconType;
    total: number; 
    link?: string;
    params?: string;
};


export const overviews: Overviews[] = [
    {
        id: '0',
        title: 'All Tasks',
        icon: LiaBorderAllSolid,
        link: '/',
        total: 10,
    },
    {
        id: '1',
        title: 'To Do',
        icon: MdOutlineAutoAwesomeMotion,
        link: '/list',
        params: 'ToDo',
        total: 10,
    },
    {
        id: '2',
        title: 'In Progress',
        icon: RiProgress5Line,
        total: 10,
        link: '/list',
        params: 'InProgress',
    },
    {
        id: '3',
        title: 'Completed',
        icon: IoCheckmarkDoneCircleOutline,
        total: 10,
        link: '/list',
        params: 'Completed',
    },
];
