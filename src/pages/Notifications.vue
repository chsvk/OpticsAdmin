<template>
  <div class="product">
    <input type="text" placeholder="Enter Product Name" v-model="product.Name">
    <input type="number" placeholder="Intial Price" v-model="product.InitialPrice">
    <input type="number" placeholder="Discounted Price" v-model="product.FinalPrice">
    <h3>Select Category</h3>
    <select v-on:change="categorySelected" name="" id="">Category
      <option value="">Select Category</option>
      <option value="EyeGlasses">EyeGlasses</option>
      <option value="SunGlasses">SunGlasses</option>
      <option value="ComputerGlasses">Computer Glasses</option>
      <option value="ReadingGlasses">Reading Glasses</option>
    </select>
    <div v-if="DisplaySubCategory">
      <h3>Select Sub-Category</h3>
      <select @change="subCategorySelected" name="" id="">
        <option value="">Select Sub-Category</option>
        <option value="">Men</option>
        <option value="">Women</option>
        <option value="">Kids</option>
      </select>
    </div>
    <h3>Enter Description</h3>
    <textarea v-model="product.Description" placeholder="Enter Product Description" name="" id="" cols="90" rows="10"></textarea>
    <h3>DIsplay Images</h3>
      <div v-if="ButtonText == 'Update Product'" class="ExistingImages">
        <img v-for="(image, index) in product.DisplayImages" :key="index" :src="image" alt="">
      </div>
      <div class="newImages cardList">
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
      <button @click="UploadHeader">Upload Display Images</button>
      <button v-if="notUploading" @click="AddProduct">{{ButtonText}}</button>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import firebase from 'firebase'
export default {
  props: ['id'],
  components: {
    PictureInput
  },
  data(){
    return{
      notUploading: false,
      product: {
        Name: null,
        InitialPrice: null,
        FinalPrice: null,
        Description: '',
        DisplayImages: [],
        MainCategory: null,
        SubCategory: null
      },
      DisplaySubCategory: false,
      ButtonText: 'Add Product'
    }
  },
  mounted(){
    if(this.$route.params.product.id){
      this.ButtonText = "Update Product"
      this.notUploading = true;
      this.product = this.$route.params.product.data;
    }else{
      this.ButtonText = "Add Product"
    }
  },
  methods: {
    AddProduct(){var vm = this;
      if(this.product.MainCategory == null){
        alert('Select Category')
      }else{
        if((this.product.name == '') && (this.product.InitialPrice == '') && 
        (this.product.FinalPrice == '') && (this.product.Description == '') && 
        (this.product.DisplayImages.length != 4)){
          alert('Fields Empty Or Please add 4 Images');
        }else{
          if(vm.ButtonText == 'Update Product'){
            firebase.firestore().collection('Products').doc(this.$route.params.product.id).update(this.product).then(()=>{
              vm.$toast(' Product Updated ')
            })
          }else{
            if(vm.product.DisplayImages.length==4){
            firebase.firestore().collection('Products').add(this.product).then(()=>{
              vm.$toast(" Product Added ")
            });
            }else{
              alert("Please wait while uploading images or Make sure You added 4 images");
            }
          } 
        } 
      }
    },
    AddNewLensType(){
      this.product.LensType.push({
        LensName: '',
        LensPrice: ''
      })
    },
    AddNewLensDetails(){
      this.product.MoreLensDetails.push({
        DetailName: '',
        InnerDetails: [{
          name: ''
        }]
      })
    },
    AddNewPoint(index){
      this.product.MoreLensDetails[index].InnerDetails.push({
        name: ''
      })
    },
    UploadHeader(){var vm = this;
      if(this.HeadOne){   
        this.notUploading = false;     
        this.ImageUploader(this.HeadOne, "Products", this.randomImageID(), "Banner_One")
        this.HeadOne = null;
      }
      if(this.HeadTwo){
        this.notUploading = false;
        this.ImageUploader(this.HeadTwo, "Products", this.randomImageID(), "Banner_Two")
        this.HeadTwo = null;
      }
      if(this.HeadThree){
        this.notUploading = false;
        this.ImageUploader(this.HeadThree, "Header", this.randomImageID(), "Banner_Three")
        this.HeadThree = null;
      }
      if(this.HeadFour){
        this.notUploading = false;
        this.ImageUploader(this.HeadFour, "Header", this.randomImageID(), "Banner_Four")
        this.HeadFour = null;
      }
      },
      headOne(image){
      this.HeadOne = this.$refs.headOne.file;
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
      ImageUploader(file, place , file_name, BannerName){
      var vm = this;
      vm.notUploading = false;
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
              vm.notUploading = true;
              vm.writeUrlToDatabase(downloadurl, BannerName)
            })
          })
      },
      writeUrlToDatabase(downloadurl, BannerName){
        var vm = this;
        if(BannerName == "Banner_One"){
          vm.product.DisplayImages[0] = downloadurl
        }else if (BannerName == "Banner_Two"){
          vm.product.DisplayImages[1] = downloadurl
        }
        else if (BannerName == "Banner_Three"){
          vm.product.DisplayImages[2] = downloadurl
        }
        else if (BannerName == "Banner_Four"){
          vm.product.DisplayImages[3] = downloadurl
        }
        console.log(this.product.DisplayImages)
      },
      randomImageID(){
        return '_' + Math.random().toString(36).substr(2, 9)
      },
      categorySelected(e){
        var vm = this;
            if(e.target.options.selectedIndex > 0) {
                var id = e.target.options[e.target.options.selectedIndex].value;
                vm.product.MainCategory = id;
                if(e.target.options.selectedIndex < 3){
                  vm.DisplaySubCategory = true;
                }else{
                  vm.DisplaySubCategory = false;
                  vm.product.SubCategory = null;
                }
            }
      },
      subCategorySelected(e){
        var vm = this;
            if(e.target.options.selectedIndex > 0) {
                vm.product.SubCategory = e.target.options[e.target.options.selectedIndex].value;
            }
      }
  },
}
</script>

<style lang="scss" scoped>
  .product{
    input{
      display: block;
      padding: 0.7em;
      margin: 1em;
      width: 40%;
    }
    .flex{
      display: flex;
    }
    h3{
      margin: 0 1em;
    }
    select{
      margin: 1em;
      background: white;
    }
    textarea{
      margin: 1em;
    }
    h4{
      margin: 0 1em;
    }
    button{
      border: none;
      font-weight: bold;
      padding: 0.7em;
      height: 50%;
      border-radius: 9px;
      margin: 0 1em;
      cursor: pointer;
    }
    .cardList{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      margin: 0 0 1em 0;
    }
    .ExistingImages{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      margin: 1em;
      img{
        height: 250px;
        width: 300px;
      }
    }
  }
</style>
