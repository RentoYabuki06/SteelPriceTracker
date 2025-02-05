'use client';
import { NavButton } from './NavButton';
import { 
  HomeIcon, 
  ChartBarIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline';

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          材料管理システム
        </h1>
      </div>
      
      <nav className="space-y-2">
        <NavButton href="/" icon={<HomeIcon />}>
          ホーム
        </NavButton>
        <NavButton href="/data" icon={<ChartBarIcon />}>
          材料データ一覧
        </NavButton>
        <NavButton href="/staff" icon={<UserGroupIcon />}>
          スタッフ管理
        </NavButton>
      </nav>
    </div>
  );
} 