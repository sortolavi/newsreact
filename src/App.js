import React, {Component} from 'react';
import './App.css';
// import news from './Testdata.js';

const DEFAULT_LIMIT = '60';
const HREF = 'http://'
const LOCATION = window.location.hostname;
// go to build folder and command: > php -S localhost:8000
const PATH_FILE = '/news_api.php?limit=';

// some handy constants
// const SECS = 1000;
// const MINS = SECS*60;
// const HRS = MINS*60;

const timeMarkArr = [5,10,20,40]; // time marks
const addZero = i => i < 10 ? "0" + i : i;

// return fn with 'item' as parameter
const isSearched = searchTerm => item =>
    item.source.toLowerCase().includes(searchTerm.toLowerCase());

// is same as this longer form:
// const isSearched = (searchTerm) => {
//   return (item) => {
//     return item.source.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// }


// ES6 class component with state and lifecycle functions
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      // result: news,
      limit: DEFAULT_LIMIT,
      searchTerm: '',
      arr_ind: 0,
      // when_first_loaded: news.timestamp
      when_first_loaded: new Date().getTime()
    };

    this.setResult = this.setResult.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  setResult(result) {
    this.setState({ result, when_first_loaded: result.timestamp });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value, arr_ind: 0 });
  }

  componentDidMount() {
    const { limit } = this.state;

    fetch(`${HREF}${LOCATION}${PATH_FILE}${limit}`)
      .then(response => response.json())
      .then(result => this.setResult(result))
      .catch(error => error);
  }

  render() {
    const {searchTerm, arr_ind, result, when_first_loaded} = this.state;
    // if (!result) { return null; }

    return (
    <div className="page">
      <nav className="navbar navbar-default navbar-top">

        <div  className="container-fluid">
          <Search
            value={searchTerm} 
            onChange={this.onSearchChange}
          >Filter by 
          </Search>
        </div>
      </nav>

      <div className="container">
      {result && 
        <Table
          list={result.data} 
          wfl = {when_first_loaded} 
          pattern={searchTerm} 
          arr_ind={arr_ind}
        />
      }
      </div>

    </div>
    )
  };
}

// const Timer = () => {
//   const myTime = '14:12  00:02';
//   return (
//     <div>{myTime}</div>
//   )
// }

// functional stateless component, props as parameter destructured
const Search = ({value, onChange, children}) =>
  <span className="nav navbar-nav navbar-right">
    {/* <Timer></Timer> */}
    <form>
      {children} <input
        type="text" 
        placeholder="Source" 
        value={value} 
        onChange={onChange}
      />
    </form>
    <Links></Links>
  </span>

const Link = ({href, children}) =>
    <a className="btn btn-info" href={href} target="_blank" rel="noopener noreferrer">{children}</a> 
  

const Links = () =>
  <span className="media-links">
    <Link href="https://www.hs.fi/">HS</Link>
    <Link href="https://www.yle.fi/">Yle</Link>
    <Link href="https://www.hs.fi/fingerpori/">F-pori</Link>
    <Link href="https://www.hs.fi/nyt/fokit/">Fok_it</Link>


    {/* <a className="btn btn-info" href="https://www.hs.fi/" target="_blank" rel="noopener noreferrer">HS</a> 
		<a className="btn btn-info" href="https://www.yle.fi/" target="_blank" rel="noopener noreferrer">Yle</a> 
		<a className="btn btn-info" href="https://www.hs.fi/fingerpori/" target="_blank" rel="noopener noreferrer">F-pori</a> 
		<a className="btn btn-info" href="https://www.hs.fi/nyt/fokit/" target="_blank" rel="noopener noreferrer">Fok_it</a> */}
  </span>


const Table = ({list, pattern, wfl, arr_ind}) =>
  <div className="newslist">
    {list.filter(isSearched(pattern)).map(item => {
      const {id, link, title, source, timestamp} = item;
      const ts = timestamp * 1000;

      const diffInMinutes = new Date(wfl - ts).getUTCMinutes();
      const diffInHours = new Date(wfl - ts).getUTCHours();

      let showTimeMark = 'none', 
          timeMark = 0;

      while(diffInMinutes > timeMarkArr[arr_ind]) {
        showTimeMark = 'block';
        timeMark = timeMarkArr[arr_ind++];
      }
      
      return (
      <div key={id}>
        <div style={{
          display: showTimeMark,
          background: '#ddd',
          padding: '2px 6px',
          }}>{timeMark} min
        </div>

        <article>
          <div className="item">
            <div className="item-content">
              <a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
            </div>
          </div>
          <div className="item-details"><span> {addZero(diffInHours)} : {addZero(diffInMinutes)}</span> {source}</div>
        
        </article>
        </div>  
      );
    })}
  </div>



export default App;
