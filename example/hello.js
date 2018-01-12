// uncomment for using class
// class HelloMessage extends React.Component {
//   render() {
//     return (
//       <div>
//         Hello {this.props.name}
//       </div>
//     );
//   }
// }

// using function
function HelloMessage(props) {
  return (
    <div>
      Hello {props.name}
    </div>
  );
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById('root')
);