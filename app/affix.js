var AffixWrapper = React.createClass({
  getDefaultProps: function() {
    return {
      offset: 0
    };
  },
  getInitialState: function() {
    return {
      affix: false
    };
  },
  checkPosition: function() {
    var affix = this.state.affix;
    var offset = this.props.offset;
    var scrollTop = document.body.scrollTop;
    console.log(scrollTop)
 
    if (!affix && scrollTop >= offset) {
      this.setState({
        affix: true
      });
    }
 
    if (affix && scrollTop < offset) {
      this.setState({
        affix: false
      });
    }
  },
 
  componentDidMount: function() {
    window.document.addEventListener('scroll', this.checkPosition);
    document.onscroll = this.checkPosition;
  },

  componentWillUnmount: function() {
    window.document.removeEventListener('scroll', this.checkPosition);
  },
 
  render: function() {
    var affix = this.state.affix ? 'affix' : '';

    return (
      <div className={affix}>
        <h1>A?{document.body.scrollTop}</h1>
        {this.props.children}
      </div>
    );
  }
 
});

