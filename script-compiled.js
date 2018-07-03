'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StopWatch = function (_React$Component) {
  _inherits(StopWatch, _React$Component);

  function StopWatch(props) {
    _classCallCheck(this, StopWatch);

    var _this = _possibleConstructorReturn(this, (StopWatch.__proto__ || Object.getPrototypeOf(StopWatch)).call(this, props));

    _this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: []
    };
    return _this;
  }

  _createClass(StopWatch, [{
    key: 'reset',
    value: function reset() {
      this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });
    }
  }, {
    key: 'format',
    value: function format(times) {
      return pad0(this.state.times.minutes) + ':' + pad0(this.state.times.seconds) + ':' + pad0(Math.floor(this.state.times.miliseconds));
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        //!this.state.running znaczy ze jest true?
        this.setState({
          running: true
        });
        this.watch = setInterval(function () {
          return _this2.step();
        }, 10);
      }
    }
  }, {
    key: 'step',
    value: function step() {
      if (!this.state.running) return;
      this.calculate();
    }
  }, {
    key: 'calculate',
    value: function calculate() {
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
  }, {
    key: 'stop',
    value: function stop() {
      if (this.state.running) {
        this.addList();
      };
      // this.addToList(this.format(this.times))}; ???
      this.state.running = false;
      clearInterval(this.watch);
    }
  }, {
    key: 'addList',
    value: function addList() {
      console.log(this.state.times);
    }
  }, {
    key: 'resetList',
    value: function resetList() {
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

  }, {
    key: 'resetOneElementOfTheList',
    value: function resetOneElementOfTheList() {}
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        { className: 'App' },
        React.createElement(
          'nav',
          { className: 'controls' },
          React.createElement(
            'a',
            { href: '#', className: 'button', id: 'start', onClick: function onClick() {
                return _this3.start();
              } },
            'Start'
          ),
          React.createElement(
            'a',
            { href: '#', className: 'button', id: 'stop', onClick: function onClick() {
                return _this3.stop();
              } },
            'Stop'
          ),
          React.createElement(
            'a',
            { href: '#', className: 'button', id: 'reset', onClick: function onClick() {
                return _this3.reset();
              } },
            'Reset'
          ),
          React.createElement(
            'a',
            { href: '#', className: 'button', id: 'resetList', onClick: function onClick() {
                return _this3.resetList();
              } },
            'Reset list'
          ),
          React.createElement(
            'a',
            { href: '#', className: 'button', id: "resetOneElementOfTheList", onClick: function onClick() {
                return _this3.resetOneElementOfTheList();
              } },
            'ResetOne'
          )
        ),
        React.createElement(
          'div',
          { className: 'stopwatch' },
          this.format(this.state.times)
        ),
        React.createElement(
          'ul',
          { className: 'results' },
          this.state.times
        )
      );
    }
  }]);

  return StopWatch;
}(React.Component);

function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

var element = React.createElement(StopWatch);
ReactDOM.render(element, document.getElementById('App'));
