import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import logo from '../../../public/logo.png';
import vect from '../../../public/vect.png';
import dash from '../../assets/dash.png';
import users from '../../assets/Vectoruserdetails.png';
import disp from '../../assets/Vectordisp.png';
import promo from '../../assets/Vectorpromo.png';
import staff from '../../assets/Vectorstaffs.png';
import control from '../../assets/Vectorusercontrol.png';
import support from '../../assets/Vectorsupport.png';

const Sidebar = () => {
  const currentRoute = usePathname();

  const [open, setOpen] = useState(true)

  const Menus = [
    { title: 'Home', src: dash, link: 'home', path: '/webapp/home' },
    { title: 'tracking', src: users, link: 'tracking', path: '/webapp/tracking' },
    { title: 'Wallet', src: disp, link: 'wallet', path: '/webapp/wallet' },
    { title: 'My Deliveries', src: promo, link: 'delivery', path: '/webapp/delivery' },
    { title: 'Settings', src: staff, link: 'settings', path: '/webapp/settings' },
    { title: 'Support', src: control, link: 'support', path: '/webapp/support' },
  ];

  return (
    <div className="flex shadow-md">
      <div
        className={`${
          open ? 'w-72' : 'w-20 '
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <div
          className={`cursor-pointer top-0 rounded-full ${!open ? 'rotate-180' : ''} ${
            open ? 'w-[60px]' : ''
          } `}
          onClick={() => setOpen(!open)}
        >
          <Image src={logo} width={60} height={60} alt="image" />
        </div>
        <div className="w-full justify-center items-center gap-3 flex mt-7 mb-4">
          <div className="rounded-full bg-gray-200 grid place-content-center w-[60px] h-[60px] overflow-clip">
            <Image src={vect} alt="" width={20} height={20} />
          </div>
          <div className="flex flex-col text-center">
            <span className={`${open ? '' : 'hidden'} text-black text-[20px]`}>Olakareem</span>
            <Link href="/webapp/profile">
            <span className={`${open ? '' : 'hidden'} text-black text-[14px] ${currentRoute === "/webapp/profile" ? 'text-[#FFE5CC]' : ''}`}>view profile</span>
            </Link>
        
          </div>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2  cursor-pointer hover:text-[#FFE5CC] text-[#040404] text-[16px] items-center gap-x-6 ${
                open ? 'ml-[20%]' : ''
              } ${currentRoute === Menu.path ? 'bg-[#FFE5CC]' : ''}`}
            >
              <Link href={Menu.link}>
                <div className="flex gap-3 items-center p-1">
                  <Image src={Menu.src} width={20} height={20} alt="image" />
                  <span className={`${!open && 'hidden'} origin-left duration-200`}>
                    {Menu.title}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
