var GIPHY_API_URL = "https://api.giphy.com";
var GIPHY_PUB_KEY = "lDDdnHXEBlFLE8KxcJurBa0jXYXKBPya";

App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: "",
      gif: {}
    };
  },

  handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });
    this.getGif(searchingText)
      .then(responseText => {
        var data = JSON.parse(responseText).data;
        this.setState({
          loading: false,
          gif: {
            url: data.fixed_width_downsampled_url,
            sourceUrl: data.url
          }
        });
      })
      .catch(error => console.log("Whoops", error));
  },

  getGif: function(searchingText) {
    const url =
      GIPHY_API_URL +
      "/v1/gifs/random?api_key=" +
      GIPHY_PUB_KEY +
      "&tag=" +
      searchingText;

    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(this.responseText));
        }
      };
      xhr.onerror = function() {
        reject(new Error(`XMLHttpRequest Error: ${this.responseText}`));
      };
      xhr.open("GET", url);
      xhr.send();
    });
  },

  render: function() {
    var styles = {
      margin: "0 auto",
      textAlign: "center",
      width: "80%"
    };
    return (
      <div style={styles}>
        <h1>Gif searcher</h1>
        <p>
          Find a gif on <a href="http://giphy.com">giphy</a> Hit enter in order
          to download them
        </p>
        <Search onSearch={this.handleSearch} />
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});

var app = React.createElement(App);
ReactDOM.render(app, document.getElementById("app"));
