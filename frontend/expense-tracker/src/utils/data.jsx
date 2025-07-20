import{
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut
} from 'react-icons/lu'

export const SIDE_MENU_DATA=[
    {
        id:"1",
        label:"Dashboard",
        icon:LuLayoutDashboard,
        path:"/dashboard"
    },
    {
        id:"2",
        label:"Income",
        icon:LuWalletMinimal,
        path:"/income"
    },
    {
        id:"3",
        label:"Expense",
        icon:LuHandCoins,
        path:"/expense"
    },
    {
        id:"4",
        label:"Logout",
        icon:LuLogOut,
        path:"/logout"
    }
];