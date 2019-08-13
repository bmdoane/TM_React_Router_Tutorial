// Not importing React because not using JSX
import { Component } from 'react'
import PropTypes from 'prop-types'
import { getTeam } from '../api'

export default class Team extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
  }
  state = {
    team: null
  }
  componentDidMount() {
    this.fetchTeam(this.props.id)
  }
  // In <Teams> we are not remounting comp once team is selected to show stats.  We are using the same comp, passing different props.
  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.fetchTeam(nextProps.id)
    }
  }
  fetchTeam = (id) => {
    this.setState(() => ({
      team: null
    }))

    getTeam(id)
      .then((team) => this.setState(() => ({ team })))
  }
  // We're passing a func to <Team>, so it's the func we want to call with the teamId.  We do this by invoking 'children'.
  render () {
    return this.props.children(this.state.team)
  }
}