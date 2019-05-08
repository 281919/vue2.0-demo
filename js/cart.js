var vm = new Vue({
  el:"#app",
  data:{
    totalMoney:0,
    productList:[],
    checkAllFlag:false,
    delFlag:false,
    curProduct:""

  },
  filters:{
      formatMoney:function(value){
          return "￥ " + value.toFixed(2);
      }
  },
  mounted:function(){
    this.$nextTick(function(){
      this.cartView()
    })
   },
  methods:{
    cartView:function(){
      let _this = this;
      vm.$http.get("data/cartData.json",{"id" : 123}).then(res=>{
        this.productList = res.body.result.list;
        
      });
    },
    changeMoney:function(product , May){
       if(May > 0){
         product.productQuantity++;
       }else{
         product.productQuantity--;
       }
       if(product.productQuantity < 1){
         product.productQuantity = 1;
       };
       this.calctotalPrice();
    },
    selectProduct:function(item){
      if(typeof item.checked == "undefined"){
        Vue.set(item , "checked" , true);
      }else{
        item.checked = !item.checked;
      };
      this.calctotalPrice();
    },
    checkAll:function(flag){
      this.checkAllFlag = flag;
      var _this = this;
      this.productList.forEach(function(item , index){
        if(typeof item.checked == "undefined"){
          Vue.set(item , "checked" , (_this.checkAllFlag = flag));
        }else{
          item.checked = _this.checkAllFlag;
        }
      });
      this.calctotalPrice();
    },
    calctotalPrice:function(){
      var _this = this;
      _this.totalMoney = 0;
      this.productList.forEach(function(item , index){
        if(item.checked){
          _this.totalMoney += item.productQuantity * item.productPrice;
        }
      });
    },
    delConfirm:function(item){
      this.delFlag = true;
      this.curProduct = item
    },
    delProduct:function(){
      var index = this.productList.indexOf(this.curProduct);
      this.productList.splice(index , 1);
      this.delFlag = false;
    }


   
  }
});

// 全局过滤器 Vue.filter
// Vue.filter("fmMoney",function(value , type){
//     return "￥ " + value.toFixed(2) + type;
// })