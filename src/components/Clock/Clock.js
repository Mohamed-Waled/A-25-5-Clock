import React from "react";
import "./clock.scss";

function Clock() {
  const [time, setTime] = React.useState(25 * 60);
  const [breakTime, setBreakTime] = React.useState(5 * 60);
  const [sessionTime, setSessionTime] = React.useState(25 * 60);
  const [timerOn, settTimerOn] = React.useState(false);
  const [onBreak, setOnBreak] = React.useState(false);
  const ref = React.useRef();

  function playMusic() {
    ref.current.play();
  }

  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? `0${minutes}` : minutes) +
      ":" +
      (seconds < 10 ? `0${seconds}` : seconds)
    );
  }

  function handleClickMinus() {
    setBreakTime((prevState) => {
      if (breakTime !== 60) {
        return prevState - 60;
      } else {
        return prevState;
      }
    });
  }
  function handleClickPlus() {
    setBreakTime((prevState) => {
      if (breakTime === 60 * 60) {
        return prevState;
      } else {
        return prevState + 60;
      }
    });
  }

  function handleClickMinus1() {
    setSessionTime((prevState) => {
      if (sessionTime !== 60) {
        return prevState - 60;
      } else {
        return prevState;
      }
    });
    setTime((prevState) => {
      if (time !== 60) {
        return prevState - 60;
      } else {
        return prevState;
      }
    });
  }
  function handleClickPlus1() {
    setSessionTime((prevState) => {
      if (sessionTime === 60 * 60) {
        return prevState;
      } else {
        return prevState + 60;
      }
    });
    setTime((prevState) => {
      if (time === 60 * 60) {
        return prevState;
      } else {
        return prevState + 60;
      }
    });
  }

  function startStopTimer() {
    const second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVar = onBreak;
    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setTime((prevState) => {
            if (prevState <= 0 && !onBreakVar) {
              playMusic();
              onBreakVar = true;
              setOnBreak(true);
              return breakTime;
            } else if (prevState <= 0 && onBreakVar) {
              playMusic();
              onBreakVar = false;
              setOnBreak(false);
              return sessionTime;
            }
            return prevState - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval", interval);
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval"));
    }
    settTimerOn(!timerOn);
  }

  function reset() {
    setTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    clearInterval(localStorage.getItem("interval"));
    settTimerOn(false);
    setOnBreak(false);
    if (ref.current.paused) {
      ref.current.play();
    } else {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  }

  return (
    <div className="clockBody">
      <div className="timeControl">
        <div className="break">
          <h2 id="break-label">Break Length</h2>
          <div className="controls">
            <button onClick={handleClickMinus} id="break-decrement">
              -1
            </button>
            <h3 id="break-length">{breakTime / 60}</h3>
            <button onClick={handleClickPlus} id="break-increment">
              +1
            </button>
          </div>
        </div>
        <div className="session">
          <h2 id="session-label">Session Length</h2>
          <div className="controls">
            <button onClick={handleClickMinus1} id="session-decrement">
              -1
            </button>
            <h3 id="session-length">{sessionTime / 60}</h3>
            <button onClick={handleClickPlus1} id="session-increment">
              +1
            </button>
          </div>
        </div>
      </div>
      <div className="timer">
        <h2 id="timer-label">{onBreak ? "Break" : "Session"}</h2>
        <h3 className="time" id="time-left">
          {formatTime(time)}
        </h3>
      </div>
      <div className="timerControls">
        <button id="start_stop" onClick={startStopTimer}>
          {timerOn ? "Pause" : "Play"}
        </button>
        <button onClick={reset} id="reset">
          Reset
        </button>
      </div>
      <audio
        ref={ref}
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
}

export default Clock;
