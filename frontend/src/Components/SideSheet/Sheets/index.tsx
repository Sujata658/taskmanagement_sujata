import Links from "../Links"
import logo from '../../../assets/undraw_donut_love_kau1.svg'
import CreateTaskCard from "../CreateTask"
import Profile from "../Profile"
import { Card } from "@/components/ui/card"

const HomeSheet = () => {
  return (
    <>
      <div className="h-screen w-full p-8 border-r flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center gap-8">
          <div className="mb-6">
            <a href='/'>
              <div className='flex gap-4 items-center justify-center'>
                <img src={logo} alt="logo" className="h-8" />
                <div className='text-2xl font-bold'>TasKit</div>
              </div>
            </a>

          </div>

          <div className="w-full">
            <CreateTaskCard />

          </div>


        </div>

        <Card className="w-full shadow-md rounded-xl">

          <Links />
        </Card>


        <div>
          <Profile />
        </div>

      </div>
    </>


  )
}

export default HomeSheet
