Filters = React.createClass({
  handleTextFilterChange: function(){
    var filters = this.props.filters;
    filters.text = this.refs.text.getDOMNode().value;
    this.props.onUpdate(filters);
  },
  handleTypeChange: function(){
    var filters = this.props.filters;
    filters.type = this.refs.type.getDOMNode().value;
    this.props.onUpdate(filters);
  },
  handleBranchChange: function(){
    var filters = this.props.filters;
    filters.branch = this.refs.branch.getDOMNode().value;
    this.props.onUpdate(filters);
  },
  handleDisplayNotRealChange: function(evt){
    var filters = this.props.filters;
    filters.hide_not_real = evt.target.checked;
    this.props.onUpdate(filters);
  },
  render:function() {
    return (
      <form className="form-inline row" method="post">
      <div className="form-group col-md-2">
        <input className="form-control" name="text" type="text" ref="text"
          onChange={this.handleTextFilterChange}
          placeholder="Rechercher..." value={this.props.filters.text}/>
      </div>
      <div className="form-group col-md-2">
      <label htmlFor="internship_type">type</label>
      <select name="internship_type" className="form-control" defaultValue="all" ref="type"
        onChange={this.handleTypeChange} >
        <option value="all">Tous</option>
        <option value="TN05">TN05</option>
        <option value="TN09">TN09</option>
        <option value="TN10">TN10</option>
        <option value="apprentissage">Apprentissage</option>
        <option value="interculturel">Interculturel</option>
      </select>
      </div>
      <div className="form-group col-md-2">
      <label htmlFor="branch">Branche</label>
      <select name="branch" className="form-control" defaultValue="all"
        onChange={this.handleBranchChange} ref="branch">
        <option value="all">Toutes</option>
        <option value="GB">GB</option>
        <option value="GI">GI</option>
        <option value="GM/GSM">GM/GSM</option>
        <option value="GP">GP</option>
        <option value="GSU">GSU</option>
      </select>
      </div>
      <div className="checkbox checkbox-inline col-md-4">
        <label>
          <input type="checkbox" defaultChecked={false}
            onChange={this.handleDisplayNotRealChange} /> Cacher stages non fait
        </label>
      </div>
      </form>
      );
}
})

SimpleSelect = React.createClass({
    getInitialState: function(){
        return {
            value:this.props.value,
        }
    },

    handleChange: function(){
        var value = this.refs.select.getDOMNode().value;
        this.setState({value:value});
        this.props.onChange(value);
    },
    
    render: function(){
        var options = this.props.options.map(function(option){
            return (<option key={option.value}
                value={option.value}
                >{option.label}</option>)
        }.bind(this))
        return (<div>
            <label>{this.props.label}</label>
            <select ref="select"
                value={this.state.value}
                onChange={this.handleChange} >
                {options}
            </select>
            </div>);
    },
})