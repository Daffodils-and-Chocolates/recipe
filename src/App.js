import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage.jsx";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage.jsx";
import RegisterPage from "./pages/register/RegisterPage.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import Recipes from "./pages/Recipes.jsx";
// import Comments from "./pages/admin/screens/comments/Comments";
// import ManagePosts from "./pages/admin/screens/posts/ManagePosts";
// import EditPost from "./pages/admin/screens/posts/EditPost";

function App() {
	return (
		<>
			<Routes>
				<Route index path="/" element={<HomePage />} />
				<Route index path="/recipes" element={<Recipes />} />
				<Route index path="/recipe/:slug" element={<ArticleDetailPage />} />
				<Route index path="/register" element={<RegisterPage />} />
				<Route index path="/login" element={<LoginPage />} />
				<Route index path="/profile" element={<ProfilePage />} />
				{/* <Route path="comments" element={<Comments />} /> */}
				{/* <Route path="posts/manage/edit/:slug" element={<EditPost />} /> */}
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
