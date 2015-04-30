Table = React.createClass({
    render: function(){
        var rows = this.props.data.map(function(x){
            return (<tr key={x.num} onClick={this.props.onSelected.bind(null,x)}>
                    <td className="col-md-1">{x.semestre}</td>
                    <td className="col-md-6">{x.sujet}</td>
                    <td className="col-md-3"><b>{x.company}</b></td>
                    <td className="col-md-2">{x.addresse}</td>
                </tr>)
        }.bind(this))
        return (
    <table className="table table-condensed table-hover table-striped">
      <thead>
      <tr>
        <th className="col-md-1">Sem.</th>
        <th className="col-md-6">Sujet</th>
        <th className="col-md-3">Company</th>
        <th className="col-md-2">Addresse</th>
      </tr>
      </thead>
          {rows}
    </table>)
    }
})