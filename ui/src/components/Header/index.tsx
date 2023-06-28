import { Button } from 'react-daisyui';
import { MoonIcon, SunIcon as OutlineSunIcon } from '@heroicons/react/24/outline';
// components
import { useDispatch, useSelector } from '../../store';
import { setTheme } from '../../store/slices/app-slice';
import { MarqoWLink } from '../Logo/MarqoWLink';

export default function Header() {
  const dispatch = useDispatch();
  const { theme } = useSelector(({ app }) => app);
  // const [isBurgerMenuClicked, setIsBurgerMenuClicked] = useState(false);

  const themeToggler = (
    <Button
      className="transparent bg-transparent border-none hover:bg-transparent p-0"
      onClick={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))}
    >
      {theme === 'light' && <OutlineSunIcon className="h-6 w-6 fill-secondary stroke-secondary" />}
      {theme === 'dark' && <MoonIcon className="h-6 w-6 fill-secondary stroke-secondary" />}
    </Button>
  );

  return (
    <header
      className={`navbar bg-primary container-fluid w-screen px-4 lg:pl-12 lg:pr-16 drop-shadow-3xl fixed z-20`}
    >
      <div className="flex-1">
        <MarqoWLink />
      </div>
      <nav className="flex-none hidden lg:block">
        <ul className="flex self-center">
          <li className="pl-12">{themeToggler}</li>
        </ul>
      </nav>
      <nav className="flex visible lg:hidden">{themeToggler}</nav>
    </header>
  );
}
