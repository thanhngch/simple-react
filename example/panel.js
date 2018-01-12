class Pane extends React.Component {
  constructor(props) {
      super(props);
  }
  render() {
      return (
          <div>
              {this.props.upp}
              {this.props.down}
              {this.props.children}
          </div>
      );
  }
};

function Up2Component(props) {
  return (
      <div className="red">
          this is red
      </div>
  );
}

function DownComponent(props) {
  return (
      <div className="blue">
          this is blue
      </div>
  );
}

ReactDOM.render(
  <Pane upp={<Up2Component />} down={<DownComponent />}> children here</Pane>, 
  document.getElementById('root')
);
