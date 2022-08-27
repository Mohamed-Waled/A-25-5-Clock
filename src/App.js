import "./App.scss";
import Clock from "./components/Clock/Clock";

function App() {
  let audio = document.getElementById("beep");

  return (
    <div className="app">
      <h1 className="title">Pomodoro Timer</h1>
      <Clock audio={audio}/>
    </div>
  );
}

export default App;
