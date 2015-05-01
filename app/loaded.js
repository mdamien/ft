var Loaded = React.createClass({
    getInitialState: function(){
        return {
            filters: {},
            selected: {},
        }
    },
    handleFilterUpdate: function(filters){
        this.setState({filters:filters});
    },
    handleSelected: function(selected){
        this.setState({selected:selected});
    },
    handleUnselect: function(){
        this.setState({selected:null});
    },
    filtered_data: function(){
        var filters = this.state.filters;
        var data = this.props.data;
        if(filters){
            if(filters.text && filters.text != ''){
                var filter = filters.text.toLowerCase();
                return jQuery.grep(data,function(line){
                    return line.all.indexOf(filter) >= 0;
                })
            }
        }
        return data;
    },
    render: function(){
        var data_filtered = this.filtered_data();
        var content = "";
        var table = (<div className="col-md-12">
                <Table data={data_filtered} onSelected={this.handleSelected} />
            </div>);
        if(this.state.selected){
            content = (<div>
                {table}
                <div className="col-md-10">
                    <InternshipPanel selected={this.state.selected} onClose={this.handleUnselect} />
                </div>
                </div>);
        }else{
            content = table;
        }
        return (<div>
            <Filters onUpdate={this.handleFilterUpdate} filters={this.state.filters}/>
            <hr/>
            <div className="row">
                {content}
            </div>
        </div>)
    }
})