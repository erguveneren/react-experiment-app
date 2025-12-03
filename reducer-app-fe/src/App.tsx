import "./styles/App.css";
import { PostContextProvider } from "./components/PostContext";
import PostList from "./components/PostList";

function App() {
  return (
    <>
      <PostContextProvider>
        <PostList />
      </PostContextProvider>
    </>
  );
}

export default App;
