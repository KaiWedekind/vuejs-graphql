<template>
  <div>
    <students/>
  </div>
</template>

<script>
import Students from '../components/Students.vue'

export default {
  name: 'hello',
  data () {
    return {}
  },
  components: {
    'students': Students
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
