var Loaded = React.createClass({
    getInitialState: function(){
        return {
            filters: {},
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
    render: function(){
        var data_filtered = Filters.applyFilters(this.state.filters, this.props.data);
        var content = "";
        var table = <Table data={data_filtered} onSelected={this.handleSelected} />;
        if(this.state.selected){
            content = (<div>
                <div className="col-md-9">{table}</div>
                <div className="col-md-3">
                    <InternshipPanel selected={this.state.selected} onClose={this.handleUnselect} />
                </div></div>);
        }else{
            content = (<div className="col-md-12">{table}</div>)
        }
        return (<div>
            <Filters onUpdate={this.handleFilterUpdate} />
            <hr/>
            <div className="row">
                {content}
            </div>
        </div>)
    }
})