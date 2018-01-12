class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokedex : this.props.pokedex
    }
  }
  onChange(e) {
    let name = e.target.value;
    let newPokedex = this.props.pokedex.filter(p => p.indexOf(name) > -1);
    this.setState({pokedex: newPokedex});
  }
  render() {
    return (
      <div>
        <h1 className="title">PokePedia</h1>
        <div className="search">
            <input onChange={this.onChange.bind(this)} type="text" placeholder="Type pokemon name"/>
        </div>
        <section className="content">
          {
            this.state.pokedex.map((name, index) =>
              <article key={index} className="pokeCard">
                  <h3>{name}</h3>
                  <img src={"https://img.pokemondb.net/artwork/" + name + ".jpg"} alt={name}/>
              </article>
            )
          }
        </section>
      </div>
    );
  }
}
const pokedex = [
  'pichu', 'pikachu', 'metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill', 'mew',
  'clefable', 'vulpix', 'ninetales', 'jigglypuff', 'wigglytuff', 'zubat', 'golbat',
  'pidgeotto', 'rattata', 'arbok', 'nidorina', 'grimer', 'onix', 'gengar', 'kingler'
];

ReactDOM.render(
  <App pokedex={pokedex} />, 
  document.getElementById('root')
);
