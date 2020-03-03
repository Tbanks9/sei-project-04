import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import UserForm from './UserForm'
import { headers } from '../../lib/headers'


class UserEdit extends React.Component {
  state = {
    data: {
      first_name: '',
      second_name: '',
      username: '',
      email: '',
    },
    errors: {}
  }

  async componentDidMount() {
    const userId = this.props.match.params.id
    console.log(this.props.match.params.id)
    try {
      const res = await axios.get(`/api/users/${userId}`, this.state.data, headers)
      this.setState({ data: res.data })
    } catch (err) {
      this.setState(err.response.data.errors)
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const user = { ...this.state.user, [name]: value }
    this.setState({ user })
  }

  handleSubmit = async e => {
    e.preventDefault()
    console.log(this.props.match.params.id)
    const userId = this.props.match.params.id
    try {
      const res = await axios.put(`/api/users/${userId}`, this.state.data, headers)
      Auth.setToken(res.data.token)
      this.props.history.push('/cities')
    } catch (err) {
      this.setState(err.response.data.errors)
    }
  }

    handleDelete = async () => {
      const userId = this.props.match.params.id
      try {
        await axios.delete(`/api/users/${userId}`, this.state.data, headers)
        this.props.history.push('/')
      } catch (err) {
        console.log(err.response)
      }
    }

  render() {
    if (!this.state.data.first_name) return null
    return (
      <UserForm
        data={this.state.data}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
        errors={this.state.errors}
      />
    )
  }
}

export default UserEdit