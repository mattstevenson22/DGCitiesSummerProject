//CSS imports
import "./styles.css";

//Component Imports
import ViewSelector from "./components/ViewSelector.jsx";
import Title from "./components/Title.jsx";



export default function App(){
  return (
    <>
      <Title />
      <ViewSelector />
    </>
  );
}