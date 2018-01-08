var router = new VueRouter({
    //mode:"hash",
    routes:[
        {
            path:'/',
            component:Main,
            children:[
                {
                    path:"",
                    //component:Menu,
                    components:{
                        left:Left,
                        right:Right,
                    },//同时操作属于同一级的

                }
            ]
        },
        {
            path:'/quick',
            component:Quick,
        }
    ],
});