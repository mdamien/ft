Filters = React.createClass({
  handleTextFilterChange: function(){
    var filters = this.props.filters;
    filters.text = this.refs.text.getDOMNode().value;
    this.props.onUpdate(filters);
  },
  render:function() {
    return (
      <form className="form-inline row">
      <div className="form-group col-md-2">
        <input className="form-control" name="text" type="text" ref="text"
          onChange={this.handleTextFilterChange}
          placeholder="Rechercher..." value={this.props.filters.text}/>
      </div>
      <div className="form-group col-md-2">
      <label htmlFor="internship_type">Stages</label>
      <select name="internship_type" className="form-control" defaultValue="all">
        <option value="all">Tous</option>
        <option value="tn05">TN05</option>
        <option value="tn09">TN09</option>
        <option value="tn10">TN10</option>
        <option value="apprenticeship">Apprentissage</option>
        <option value="intercultural">Interculturel</option>
      </select>
      </div>
      <div id="branch-type-filter" className="form-group col-md-2">
      <label htmlFor="branch">Branche</label>
      <select name="branch" className="form-control" defaultValue="all">
        <option value="all">Toutes</option>
        <option value="gb">GB</option>
        <option value="gi">GI</option>
        <option value="gm">GM</option>
        <option value="gp">GP</option>
        <option value="gsm">GSM</option>
        <option value="gsu">GSU</option>
      </select>
      </div>
      </form>
      );
}
})