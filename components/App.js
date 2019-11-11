var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'BV9l7z9JKUjN7rTY1OkyKOnGCPVvWSEO';
App = React.createClass({

    getInitialState(){
        return{
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText){
        this.setState({
            loading: true
        });
        this.getGif(searchingText).then(gif => {
            this.setState({
                loading: false,
                gif,
                searchingText: searchingText
            });
        })
    },

    getGif: function(searchingText){
        return new Promise(
            function(resolve, reject){
                var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.onload = function(){
                    if(xhr.status === 200){
                        var data = JSON.parse(xhr.responseText).data;
                        var gif = {
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };   
                        resolve(gif);
                    }else {reject(new Error('Zła odpowiedź'))}
                };
                xhr.send();
            }
        );
    },

    render: function(){

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };
    
        return (
            <div style={styles}>
                <h1>Wyszukiwarka gifow</h1>
                <p>Znajdz gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrac kolejne giphy</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    }
});

var element = React.createElement(App);
ReactDOM.render(element, document.getElementById('app'));