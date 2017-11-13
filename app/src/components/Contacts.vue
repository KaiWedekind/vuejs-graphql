<template>
  <div>
    <section>
      <img :src="me.image" alt="">
      <div>
        <b>{{me.first_name}} {{me.last_name}}</b>
        <small>My iPhone: {{me.phone}}</small>
      </div>
    </section>
    <ul>
      <li v-for="(contact, index) in contacts" :key="index" :data-group="index==0 || contact.last_name[0] !== contacts[index - 1].last_name[0] ? contact.last_name[0] : null">
        <div>{{ contact.first_name }} <strong>{{ contact.last_name }}</strong></div>
        <small>{{contact.email}}</small>
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'contacts',
  data () {
    return {
      me: '',
      contacts: []
    }
  },
  apollo: {
    me: gql`{
      me: Me {
        first_name
        last_name
        phone
        image
      }
    }`,
    contacts: gql`{ 
      contacts: Contacts(sortBy: "last_name") {
        id
        first_name
        last_name
        email
      }
    }`
  }
}
</script>

<style scoped>
  section {
    display: flex;
    padding: 10px 25px;
    align-items: center;
  }

  section img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 15px;
    border: 1px solid #eeeeee;
  }

  section div {
    display: flex;
    text-align: left;
    flex-direction: column;
  }

  ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
  }

  li {
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 10px 0px;
    margin: 0px 25px;
    border-bottom: 1px solid #eeeeee;
  }

  li[data-group]{
    margin-top: 25px;
  }

  li[data-group]:before {
    position: absolute;
    top: -26px;
    left: -25px;
    display: flex;
    align-items: center;
    width: 100vw;
    padding: 3px 25px 1px 25px;
    box-sizing: border-box;
    content: attr(data-group);
    background-color: #efefef;
    font-weight: 600;
  }
</style>
