<template>
  <div>
    <h1>{{ welcome }}</h1>
    <h2>Students List</h2>
    <ul>
      <li v-for="student in students">
        {{ student.first_name }} {{ student.last_name }}, ID: {{student.id}}
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'students',
  data () {
    return {
      welcome: '',
      students: []
    }
  },
  apollo: {
    welcome: gql`{
      welcome: Welcome
    }`,
    students: gql`{ 
      students: AllStudents {
        id
        first_name
        last_name
      }
    }`
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
  }
</style>
