<template>
  <div class="banners">
    <h3>Header Banners Upload Status: {{uploadStatus}}</h3>
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
    <h3>Footer Banners</h3>
    <div class="existingImages">
        <img v-for="image in footer" :src="image" alt="">
      </div>
      <div class="newImages">
        <picture-input 
          ref="footOne"
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
          @change="footOne">
        </picture-input>
        <picture-input 
          ref="footTwo"
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
          @change="footTwo">
        </picture-input>
        <picture-input 
          ref="footThree"
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
          @change="footThree">
        </picture-input>
        <picture-input 
          ref="footFour"
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
          @change="footFour">
        </picture-input>
      </div>
      <button @click="UploadFooter">Upload Footer Images</button>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import firebase from 'firebase'
export default {
  components: {
    PictureInput
  },
  data(){
    return{
      header: [],
      footer: [],
      HeadOne: null,
      HeadTwo: null,
      HeadThree: null,
      HeadFour: null,
      FootOne: null,
      FootTwo: null,
      FootThree: null,
      FootFour: null,
      uploadStatus: false
    }
  },
  methods: {
    headOne(image){
      this.HeadOne = this.$refs.headOne.file;
      console.log(this.HeadOne);
    },
    headTwo(image){
      this.HeadTwo = this.$refs.headTwo.file;
    },
    headThree(image){
      this.HeadThree = this.$refs.headThree.file;
    },
    headFour(image){  
      this.HeadFour = this.$refs.headFour.file;
    },
    footOne(image){
      this.FootOne = this.$refs.footOne.file;
    },
    footTwo(image){
      this.FootTwo = this.$refs.footTwo.file;
    },
    footThree(image){
      this.FootThree = this.$refs.footThree.file;
    },
    footFour(image){
      this.FootFour = this.$refs.footFour.file;
    },
    UploadHeader(){var vm = this;
      if(this.HeadOne){        
        this.ImageUploader(this.HeadOne, "Header", "Banner_One")
        this.HeadOne = null;
      }
      if(this.HeadTwo){
        this.ImageUploader(this.HeadTwo, "Header", "Banner_Two")
        this.HeadTwo = null;
      }
      if(this.HeadThree){
        this.ImageUploader(this.HeadThree, "Header", "Banner_Three")
        this.HeadThree = null;
      }
      if(this.HeadFour){
        this.ImageUploader(this.HeadFour, "Header", "Banner_Four")
        this.HeadFour = null;
      }
      },
    UploadFooter(){
      if(this.FootOne){
        this.ImageUploader(this.FootOne, "Footer", "Banner_One")
        this.FootOne = null;
      }
      if(this.FootTwo){
        this.ImageUploader(this.FootTwo, "Footer", "Banner_Two")
        this.FootTwo = null;
      }
      if(this.FootThree){
        this.ImageUploader(this.FootThree, "Footer", "Banner_Three")
        this.FootThree = null;
      }
      if(this.FootFour){
        this.ImageUploader(this.FootFour, "Footer", "Banner_Four")
        this.FootFour = null;
      }
    },
    ImageUploader(file, place , file_name){
      var vm = this;
      var storageref = firebase.storage().ref(place + '/' + file_name);
        var task = storageref.put(file);
        task.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(file_name + " " + progress);
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {
              vm.$toast(error.message);
              console.log(error.message);
          }, function() {
            task.snapshot.ref.getDownloadURL().then(function(downloadurl) {
              vm.writeUrlToDatabase(place, downloadurl, file_name)
            })
          })
    },
    writeUrlToDatabase(place, downloadurl, file_name){
      console.log("Writing " + place + " " + downloadurl)
      var db = firebase.firestore();
      var name = file_name
      firebase.firestore().collection('Products').doc(place).update({
        [name]: downloadurl
          }).catch((err)=>{
              console.log(err.message);
          }).then(()=>{
            console.log('Succesfully Updated');
          })
    }
  },
  mounted(){
    var vm = this;
    firebase.firestore().collection("Products").doc("Header").onSnapshot((doc)=>{
      vm.header = [];
      vm.header.push(doc.data().Banner_One)
      vm.header.push(doc.data().Banner_Two)
      vm.header.push(doc.data().Banner_Three)
      vm.header.push(doc.data().Banner_Four)
    })
    firebase.firestore().collection("Products").doc("Footer").onSnapshot((doc)=>{
      vm.footer = [];
      vm.footer.push(doc.data().Banner_One)
      vm.footer.push(doc.data().Banner_Two)
      vm.footer.push(doc.data().Banner_Three)
      vm.footer.push(doc.data().Banner_Four)
    })
  }
}
</script>

<style lang="scss" scoped>

  .banners{
    .existingImages{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      img{
        height: 250px;
        width: auto;
        margin: 0.7em;
      }
    }
    .newImages{
      margin-top: 1em;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      img{
        height: 250px;
        width: auto;
        margin: 0.7em;
      }
    }
    button{
      margin: 1em;
      padding: 0.7em;
      font-weight: bold;
      border: none;
      background: #f5f5f5;
      cursor: pointer;
    }

  }
</style>

