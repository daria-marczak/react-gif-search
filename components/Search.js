Search = React.createClass({
        getInitialState() {
            return {
                searchingText: ""
            };
        },

        handleChange: function(event) {
            var searchingText = event.target.value;
            this.setState({
                searchingText: searchingText
            });

            if (searchingText.length > 2) {
                this.props.onSearch(searchingText);
            }
        },

        handleKeyUp: function(event) {
            if (event.keyCode === 13) {
                this.props.onSearch(this.state.searchingText);
            }
        },

        render: function() {
            var styles = {
                fontSize: "1rem",
                width: "90%",
                maxWidth: "350px"
            };
            return
                <input type="text" onChange={this.handleChange} placeholder="What do you search for?" style={styles} value={this.state.searchTerm} />
    }
});
