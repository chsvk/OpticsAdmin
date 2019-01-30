<template>
  <footer class="footer">
    <p style="margin-left: 3%">Optics Hub {{year}}</p>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  };
</script>
<style>
</style>
