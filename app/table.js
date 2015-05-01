Table = React.createClass({
  handleSelected: function(x){
      this.props.onSelected(x);
  },
  render: function(){
    var tr_style = {
        cursor:'pointer',
    }
    var rows = this.props.data.slice(0,100).map(function(x){
        infos =  (<tr style={tr_style} key={x.id} onClick={this.handleSelected.bind(null,x)}>
            <td>{x.semestre}{x.semestre_annee}</td>
            <td>{x.sujet}</td>
            <td><b>{x.company}</b></td>
            <td>{x.addresse}</td>
            </tr>)
        return infos;
    }.bind(this))
    return (
        <table className="table table-condensed table-hover table-striped">
        <thead>
        <tr>
            <th className="col-md-1">Sem.</th>
            <th className="col-md-5">Sujet</th>
            <th className="col-md-3">Entreprise</th>
            <th className="col-md-3">Addresse</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
        </table>)
}
})