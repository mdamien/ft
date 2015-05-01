InternshipPanel = React.createClass({

    render: function(){
      var style = {
        position: 'fixed',
        top:'30',
        right:'40',
        width: '30%',
        minWidth: '300',
        maxWidth: '700',
        maxHeight: '80%',
        overflow: 'auto',
      }
      return (<div className="panel panel-success" style={style}>
                    <div className="panel-heading">
                      <h3 className="panel-title">{this.props.selected.sujet}</h3>
                      <button className="btn btn-default pull-right"
                        onClick={this.props.onClose}>fermer</button>
                    </div>
                    <div className="panel-body">
                      <br/>
                      {this.props.selected.description}
                      <hr/>
                      <pre>
                      {JSON.stringify(this.props.selected, null, 2)}
                      </pre>
                    </div>
                </div>);
    }
})