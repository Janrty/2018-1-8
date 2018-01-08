var Main = Vue.component("Main",{
    template:`
<div class="template">
   
    <div class="body">
        <div class="left">
            <router-view name="left"></router-view>
        </div>
        <div class="right">
            <router-view name="right"></router-view>
        </div>
    </div> 
</div>
       
    `,

});

var Left = Vue.component("Menu",{
    template:`
        <div>
            <ul>
                <div v-for="item in data">
                    <li><router-link :to="'#'+item.id">{{item.title}}</router-link> </li>
                    <ul>
                        <li v-for="item1 in item.child"><router-link :to="'#'+item1.id">{{item1.title}}</router-link></li>
                    </ul>
                </div>
            </ul>
        </div>
        `,

    data(){
        return {
            menu:[
                // {id:1,title:"全局配置",pid:0},
                // {id:2,title:"silent",pid:1},
                // {id:3,title:"optionMergeStrategies",pid:1},
                // {id:4,title:"全局 API",pid:0},
                // {id:5,title:"Vue.extend",pid:4},
                // {id:6,title:"Vue.nextTick",pid:4},
            ],
        }
    },  //vue 项目模拟 后台数据
    computed:{
        data(){
            var arr = [];

            for(var i in this.menu){
                if(this.menu[i].pid==0){
                    var obj=this.menu[i];
                    arr.push(obj);
                }else{
                    for(var j in arr){
                      if(this.menu[i].pid==arr[j].id){
                          if(arr[j].child){
                              arr[j].child.push(this.menu[i]);
                          }else{
                              arr[j].child=[];
                              arr[j].child.push(this.menu[i]);
                              console.log(arr[j].child)
                          }
                      }
                    }
                }
            }
            return arr;
        }
    },

    created(){
        fetch("./demo.txt").then(function (e) {
            return e.json();
        }).then(e=>{
            this.menu=e;
        })
    },
    watch:{
        $route(){
            var num = this.$route.hash.slice(1);
            //console.log(num);
            var pos=document.querySelector("#a"+num).offsetTop-40;


                function animate () {
                    if (TWEEN.update()) {
                        requestAnimationFrame(animate)
                    }
                }

                new TWEEN.Tween({ number:document.querySelector(".right").scrollTop })
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .to({ number:pos }, 500)
                    .onUpdate(function () {
                        document.querySelector(".right").scrollTop = this.number.toFixed(0);
                    })
                    .start();

                animate()

        }
    }

});
var Right = Vue.component("Menu",{
    template:`
<div class="markdown-body">
    <div v-html="data"></div>
</div>
        
    `,
    data(){
        return{
            data:""
        }
    },
    mounted(){
        fetch("./doc.txt").then(function (e) {
            return e.text();
        }).then((e)=> {
            this.data=e;
        })
    }
});

var Quick = Vue.component("Quick",{
    template:`
     <div style="width: 100%;height: 300px;border:1px solid #ff6700;padding-top: 40px;line-height: 300px;text-align: center;font-size: 24px">   这是Quick
     </div>
     `,
});