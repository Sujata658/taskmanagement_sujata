import { Link } from 'react-router-dom';

import {homeLinks} from '../const'


const Links = () => {
  return (
    <>
      <div className='p-2'>
            {homeLinks.map((link) => {
                return (
                    <Link to={link.path} key={link.id} className='flex gap-8  items-center mb-3 hover:bg-stone-300 dark:hover:text-background px-4 py-3 rounded-md'>
                        {link.icon && <link.icon />}
                        <div>{link.title}</div>
                    </Link>
                );
            })}
        </div>
    </>
  )
}

export default Links