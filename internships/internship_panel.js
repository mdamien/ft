InternshipPanel = React.createClass({
    render: function(){
      return (<div className="panel panel-success">
                    <div className="panel-heading">
                      <h3 className="panel-title">{this.props.selected.sujet}</h3>
                    </div>
                    <div className="panel-body">
                      {this.props.selected.description}
                      <hr/>
                      <div className="btn-group pull-right">
                        <a href="#" onClick={this.props.onClose}className="btn btn-default btn-sm">close</a>
                      </div>
                    </div>
                </div>);
    }
})