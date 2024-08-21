import { ThemeButton } from '@/Components/SideSheet/ThemeButton'
import { useUser } from '@/context/UserContext'
import moment from 'moment'
const GreetNav = () => {



    const {user} = useUser()
    return (
        <>
            <div className="flex justify-between items-center my-6 mx-8">
                <div>
                    <div>
                        <h1 className="text-xl font-bold">Greetings, {user?.name}</h1>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">{moment().format('dddd, MMMM Do YYYY')}</p>
                    </div>
                </div>
                <div className='flex items-center'>
                    <ThemeButton />
                   

                </div>

            </div>
        </>
    )
}



export default GreetNav