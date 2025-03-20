import { Link, useLocation } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Menu } from 'lucide-react';

export function Header() {
  const { isSignedIn } = useUser();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Health Monitor
            </span>
          </Link>
          
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search functionality here if needed */}
          </div>
          <nav className="flex items-center">
            {isSignedIn && (
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg",
                    userButtonPopoverActions: "bg-white dark:bg-gray-800",
                    userButtonPopoverActionButton: "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
                    userButtonPopoverFooter: "hidden",
                  }
                }}
              />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 