<template>
    <div class="uploadImages">
        <h3>Display Images: {{uploadStatus}}</h3>
      <div class="existingImages">
        <img v-for="image in header" :src="image" alt="">
      </div>
      <div class="newImages">
        <picture-input 
          ref="headOne"
          width="600" 
          height="600" 
          margin="16" 
          accept="image/jpeg,image/png" 
          size="10" 
          button-class="btn"
          :custom-strings="{
            upload: '<h1>Bummer!</h1>',
            drag: 'Image One'
          }"
          @change="headOne">
        </picture-input>
        <picture-input 
          ref="headTwo"
          width="600" 
          height="600" 
          margin="16" 
          accept="image/jpeg,image/png" 
          size="10" 
          button-class="btn"
          :custom-strings="{
            upload: '<h1>Bummer!</h1>',
            drag: 'Image Two'
          }"
          @change="headTwo">
        </picture-input>
        <picture-input 
          ref="headThree"
          width="600" 
          height="600" 
          margin="16" 
          accept="image/jpeg,image/png" 
          size="10" 
          button-class="btn"
          :custom-strings="{
            upload: '<h1>Bummer!</h1>',
            drag: 'Image Three'
          }"
          @change="headThree">
        </picture-input>
        <picture-input 
          ref="headFour"
          width="600" 
          height="600" 
          margin="16" 
          accept="image/jpeg,image/png" 
          size="10" 
          button-class="btn"
          :custom-strings="{
            upload: '<h1>Bummer!</h1>',
            drag: 'Image Four'
          }"
          @change="headFour">
        </picture-input>
      </div>
      <button @click="UploadHeader">Upload Header Images</button>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
