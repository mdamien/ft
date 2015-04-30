var Loader = React.createClass({
    getInitialState: function(){
        return {
            loading: false,
            data_url: this.props.data_url,
            data: [],
        }
    },
    componentDidMount: function(){
        this.load();
    },
    start_load: function(){
        this.setState({
            data_url:this.refs.data_url.getDOMNode().value,
            data:[],
        },this.load);
    },
    load: function(){
        this.setState({loading:true})
        Papa.parse(this.state.data_url, {
            download: true,
            header: true,
            complete: function(results) {
                results.data.sort(function(x,y){
                    if(x.semestre_annee < y.semestre_annee){
                        return 1;
                    }
                    if(x.semestre_annee > y.semestre_annee){
                        return -1;
                    }
                    return 0;
                })
                results.data.map(function(x,i){
                      x.all = _.values(x).join(' ').toLowerCase();
                })
                this.setState({
                    loading:false,
                    data:results.data,
                })
            }.bind(this)
        });
    },
    render: function(){
        var content = "";
        if(this.state.loading){
            content = <strong>loading...</strong>;
        }
        else if(this.state.data.length > 0){
            content = (<Loaded data={this.state.data} />);
        }
        return (<div>
            {content}
        </div>);
    },
})