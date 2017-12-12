App = React.createClass({
    render: function() {
        var styles = {
            margin: "0 auto",
            textAlign: "center",
            width: "80%"
        };
        return (
            <div style={styles}>
                    <h1>Gif searcher</h1>
                    <p>Find a gif on <a href="http://giphy.com">giphy</a> Hit enter in order to download them</p>
                    <Search onSearch={this.handleSearch}/>
                    <Gif
                        loading={this.state.loading}
                        url={this.state.gif.url}
                        sourceUrl={this.state.gif.sourceUrl}
                    />
            </div>
        );
    },
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
        this.getGif(searchingText, function(gif) {
            this.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        }.bind(this));
    },
    getGif: function(searchingText, callback) {
        var url = GIPHY_API_URL + "/v1/gifs/random?api_key=" + GIPHY_PUB_KEY + "&tag=" + searchingText;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText).data;
                var gif= {
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif);
            }
        };
        xhr.send();
    }

});

var app = React.createElement(App);
ReactDOM.render(app, document.getElementById("app"));
