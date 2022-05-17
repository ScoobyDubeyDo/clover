import { Route, Routes } from "react-router-dom";
import { AppWrapper } from "./components/AppWrapper/AppWrapper";
import { Explore, Home, Profile, Saved, Signin, Signup, SinglePost } from "./pages";

function App() {
    return (
        <Routes>
            <Route path="sign-up" element={<Signup />} />
            <Route path="sign-in" element={<Signin />} />
            <Route element={<AppWrapper />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/singlepost" element={<SinglePost />} />
            </Route>
        </Routes>
    );
}

export default App;
