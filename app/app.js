var App = React.createClass({
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
            dynamicTyping: true,
            complete: function(results) {
                this.setState({
                    loading:false,
                    data:results.data,
                })
            }.bind(this)
        });
    },
    render: function(){
        var message = "";
        var content = "";
        if(this.state.loading){
            message = <strong>loading .csv</strong>;
        }
        else if(this.state.data.length > 0){
            var tabs = [
                {name:'table',type:'table'},
                {type:'chart', name:'chart',x:{},y:{},scatter:true},
                {name:'map',type:'map'},
                {name:'graph',type:'graph'},
                ]
            content = (<Tabs data={this.state.data}
                    tabs={tabs} current_tab={tabs.length-1}/>);
            message = (<span>Imported <strong>{this.state.data_url}</strong
                > with <strong>{this.state.data.length}</strong> lines
                </span>);
        }
        return (<div>
            <input ref="data_url" defaultValue={this.state.data_url}/>
                <button onClick={this.start_load}>load</button>  {message}
            {content}
        </div>);
    },
})
