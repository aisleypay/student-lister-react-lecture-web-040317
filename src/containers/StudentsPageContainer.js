import React, { Component } from 'react'

import {StudentsAdapter} from '../adapters'
import StudentsPage from '../components/StudentsPage'
// This component acts as a controller - fetches data and renders a view

import withAuth from '../hocs/withAuth'

class StudentsPageContainer extends Component {

  constructor(){
    super()
    this.state = {
      students: []
    }
    this.createStudent = this.createStudent.bind(this)
    this.deleteStudent = this.deleteStudent.bind(this)
    this.updateStudent = this.updateStudent.bind(this)
  }

  componentDidMount(){
    StudentsAdapter.all()
      .then( data => this.setState({ students: data}) )
  }

  createStudent(student){
    StudentsAdapter.create(student)
      .then(student => this.setState((previousState) => {
        return {
          students: [...previousState.students, student]
        }
      })
    )
  }

  deleteStudent(id){
    StudentsAdapter.destroy(id)
      .then( () => {
        this.setState( previousState => {
          return {
            students: previousState.students.filter( student => student.id !== id )
          }
        })
        this.props.history.push("/students")
      })
  }

  updateStudent(student){
    StudentsAdapter.update(student).then(() => {
      this.setState(function(previousState){
        return {
          students: previousState.students.map(function(s){
            if (s.id !== student.id ) {
              return s
            } else {
              return student
            }
          })
        }
      })
      this.props.history.push(`/students/${student.id}`)
    })
  }

  render(){
    return <StudentsPage students={this.state.students}
                        deleteStudent={this.deleteStudent}
                        updateStudent={this.updateStudent}
                        createStudent={this.createStudent}/>
  }
}

export default withAuth(StudentsPageContainer)
