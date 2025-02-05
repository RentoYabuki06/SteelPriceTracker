import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	List,
	ListItem,
	Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TableChartIcon from "@mui/icons-material/TableChart";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import NavButton from "@/components/Sidebar/NavButton";

const Sidebar: React.FC = () => {
	const router = useRouter();
	const [currentPath, setCurrentPath] = useState("");

	// 現在のパスを取得
	useEffect(() => {
		setCurrentPath(window.location.pathname);
	}, []);

	// ナビゲーション項目リスト
	const navItems = [
		{ path: "/", label: "ホーム", icon: <HomeIcon /> },
		{ path: "/data", label: "データ", icon: <TableChartIcon /> },
		{ path: "/staff", label: "人件費", icon: <PeopleIcon /> },
		{ path: "/settings", label: "設定", icon: <SettingsIcon /> },
	];

	return (
		<aside className="w-64 bg-white">
			<List>
				{/* ロゴクリックでホームへ遷移 */}
				<ListItem>
					<img
						src="/image/icon_material_market_ai.png"
						alt="Logo"
						className="w-full mb-4 cursor-pointer"
						onClick={() => router.push("/")}
					/>
				</ListItem>
				<Divider />

				{/* ナビゲーションボタン表示 */}
				{navItems.map((item) => (
					<NavButton
						key={item.path}
						path={item.path}
						label={item.label}
						icon={item.icon}
						currentPath={currentPath}
					/>
				))}
			</List>
		</aside>
	);
};

export default Sidebar;
