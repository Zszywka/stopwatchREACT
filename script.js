class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: []
    }
  }

  reset() {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }
  format(times) {
    return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
  }
  start() {
    if (!this.state.running) { //!this.state.running znaczy ze jest true?
      this.setState({
        running: true
      });
      this.watch = setInterval( () => this.step(), 10);
    }
  }
  step() {
    if (!this.state.running) return;
    this.calculate();
  }
  calculate() {
    this.state.times.miliseconds += 1;
    if (this.state.times.miliseconds >= 100) {
      this.state.times.seconds += 1;
      this.state.times.miliseconds = 0;
    }
    if (this.state.times.seconds >= 60) {
      this.state.times.minutes += 1;
      this.state.times.seconds = 0;
    }
    this.setState({
      times: this.state.times
    });
  }
  stop() {
    if (this.state.running) {
      this.addList()
    };
      // this.addToList(this.format(this.state.times))}; wtedy dziala
    this.state.running = false;
    clearInterval(this.watch);
  }
  addList() {
    this.state.results.push(this.format());
    this.setState({});
  }

  resetList() {
    this.setState({
      results: []
    });
  }
  // dlaczego nie:
  // resetList() {
  //   this.state = {
  //     result: []
  //   };
  // }
  resetOneElementOfTheList() {
    console.log(this.state.results);
    const res = this.state.results;
    res.pop();
    this.setState({results: res});
  }

  render() {
    return (
      <div className={'App'}>
        <nav className={'controls'}>
          <a href={'#'} className={'button'} id={'start'} onClick={() => this.start()}>Start</a>
          <a href={'#'} className={'button'} id={'stop'} onClick={() => this.stop()}>Stop</a>
          <a href={'#'} className={'button'} id={'reset'} onClick={() => this.reset()}>Reset</a>
          <a href={'#'} className={'button'} id={'resetList'} onClick={() => this.resetList()}>Reset list</a>
          <a href={'#'} className={'button'} id={'resetOneElementOfTheList'} onClick={() => this.resetOneElementOfTheList()}>ResetOne</a>
        </nav>
        <div className={'stopwatch'}>
          {this.format(this.state.times)}
        </div>
        <ul className={'results'}>
          {this.state.results.map((element, index) => <li key={index}> {element} </li>)}
        </ul>
      </div>
    );
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

var element = React.createElement(StopWatch);
ReactDOM.render(element, document.getElementById('App'));
