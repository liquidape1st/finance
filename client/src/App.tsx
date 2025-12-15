import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { BlogsPage } from "./pages/BlogsPage";
import { ResourcesPage } from "./pages/ResourcesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
    </Routes>
  );
}