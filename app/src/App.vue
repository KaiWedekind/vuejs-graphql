<template>
  <div id="app">
    <header>
      <span>Contacts</span>
      <input type="text" placeholder="Search">
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
</script>
<style>
html, body {
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  display: flex;
  flex-direction: column;
  height: 100vh;

  max-width: 600px;
  margin: 0px auto;
  border-left: 1px solid #efefef;
  border-right: 1px solid #efefef;
}

main {
  text-align: center;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  height: 100px;
  padding: 20px 15px 0 25px;
  color: #000000;
  border-bottom: 1px solid #dddddd;
  background-color: #fbfbfb;
}

header span {
  font-size: 2rem;
  font-weight: 900;
}

header input {
  box-sizing: border-box;
  background-color: #efefef;
  border: none;
  height: 35px;
  border-radius: 8px;
  padding: 5px 15px;
  font-size: 0.9rem;
}
</style>
