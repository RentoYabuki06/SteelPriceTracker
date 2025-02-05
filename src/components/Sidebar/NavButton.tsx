import React from "react";
import { useRouter } from "next/navigation";
import {
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

// ナビゲーションボタンの型定義
interface NavButtonProps {
	path: string; // 遷移先のパス
	label: string; // ボタンの表示ラベル
	icon: React.ReactNode; // アイコン
	currentPath: string; // 現在のパス
}

// ナビゲーションボタンコンポーネント
const NavButton: React.FC<NavButtonProps> = ({ path, label, icon, currentPath }) => {
	const router = useRouter(); // ページ遷移用のルーター
	const isActive = currentPath === path; // 現在のページかどうかを判定

	return (
		<ListItemButton
			onClick={() => router.push(path)} // ボタン押下時のページ遷移処理
			style={isActive ? { backgroundColor: "#1976d2", color: "#fff" } : {}} // アクティブ状態のスタイル
		>
			<ListItemIcon style={isActive ? { color: "#fff" } : {}}>{icon}</ListItemIcon>
			<ListItemText
				primary={label}
				primaryTypographyProps={{ fontWeight: isActive ? "bold" : "normal" }} // アクティブ状態で文字を太字に
			/>
		</ListItemButton>
	);
};

export default NavButton;
