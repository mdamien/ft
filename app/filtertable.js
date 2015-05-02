var FilterTable = React.createClass({
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
    filtered_data: function(){
        var filters = this.state.filters;
        var data = this.props.data;
        if(filters){
            var text = false;
            if(filters.text && filters.text != ''){
                text = filters.text.toLowerCase();
            }
            var type = false;
            if(filters.type && filters.type != 'all'){
                type = filters.type;
            }
            var branch = false;
            if(filters.branch && filters.branch != 'all'){
                branch = filters.branch;
            }
            var hide_not_real = false;
            if(filters.hide_not_real != undefined && filters.hide_not_real == true){
                hide_not_real = true;
            }
            if(text || type || branch ||hide_not_real){
                return jQuery.grep(data,function(line){
                    if(hide_not_real && !line.stage_reel){
                        return false;
                    }
                    if(type && line.niveau_abbrev != type){
                        return false;
                    }
                    if(branch && line.branche_abbrev != branch){
                        return false;
                    }
                    if(text && line.all.indexOf(text) == -1){
                        return false;
                    }
                    return true;
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