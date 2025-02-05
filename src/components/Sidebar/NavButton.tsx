import Link from 'next/link';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type NavButtonProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
};

export function NavButton({ href, children, icon }: NavButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${isActive 
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
        }`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{children}</span>
    </Link>
  );
} 