import "./styles/App.css";
import { PostContextProvider } from "./components/PostContext";
import PostList from "./components/PostList";

function App() {
  return (
    <section className="appBackground">
      <PostContextProvider>
        <PostList />
      </PostContextProvider>
    </section>
  );
}

export default App;
