var Tabs = React.createClass({
    getInitialState:function(){
        var current_tab = this.props.current_tab ? this.props.current_tab : -1
        if(current_tab == -1 && this.props.tabs){
            current_tab = 0
        }
        
        return {
            'current_tab':current_tab,
            'tabs':this.props.tabs ? this.props.tabs : [], 
        }
    },

    changeTab: function(tab){
        this.setState({
            'current_tab':tab,
        })
    },
    addNewTab: function(tab){
        var tabs = this.state.tabs;
        tabs.push(tab);
        this.setState({'tabs':tabs,'current_tab':tabs.length-1})
    },
    removeTab: function(tab){
        var tabs = this.state.tabs;
        tabs.splice(tab,1)
        this.setState({'tabs':tabs,'current_tab':-1})
    },
    render:function(){
        var tabs = [], curr_tab = false;
        if(this.state.current_tab != -1){
            curr_tab = this.state.tabs[this.state.current_tab]
        }
        var tabs = this.state.tabs.map(function(tab, i){
            var className = curr_tab && this.state.current_tab == i ? "active" : "";
            return (<li key={i} className={className}><a
                href="#"
                onClick={this.changeTab.bind(null, i)}>
                    {tab.name}
                </a>
                </li>)
        }.bind(this))

        var tabs_choices_infos = [
            {type:'table', name:'table'},
            {type:'chart', name:'chart',x:{},y:{},scatter:true},
            {type:'map', name:'map'},
        ];

        var tabs_choices = tabs_choices_infos.map(function(x,i){
            return (<li key={i}>
                    <a
                        onClick={this.addNewTab.bind(null, x)}
                        href='#'>{x.type}</a>
                    </li>);
        }.bind(this))

        /*
        tabs.push((<div key="-1" className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle"
                        data-toggle="dropdown" aria-expanded="false">
                    Add tab <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" role="menu">
                        {tabs_choices}
                    </ul>
                  </div>
        ))
        */

        var content = <div>no tab selected {curr_tab}</div>;
        var filters = [];
        if (curr_tab){
            if(curr_tab.type == 'table'){
                content = (<Table params={curr_tab} />)
            }else if(curr_tab.type == 'chart'){
                content = <ChartBuilder params={curr_tab} />;
            }else if(curr_tab.type == 'map'){
                content = <MapBuilder params={curr_tab} />;
            }else if(curr_tab.type == 'graph'){
                content = <GraphBuilder params={curr_tab} />;
            }else{
                content = <div>unknow tab type</div>;
            }
            filters = curr_tab.filters;
        }
        return (<div><br/>
                <ul className="nav nav-tabs">{tabs}</ul>
                <br/>
            <Filters key={this.state.current_tab} data={this.props.data} filters={filters}>
                {content}
            </Filters>
            </div>);
    }
})