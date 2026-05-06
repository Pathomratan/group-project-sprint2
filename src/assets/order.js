export const orders=[
    {id:"1",
     orderList:[
        {id:1,name:"fire_chicken",
            quantity:2,
            countdownTime:120,
            status:"InKitchen",
            orderTime:new Date(2026,5,4,15,0,15),
        },
        {id:2,name:"burger",quantity:1,countdownTime:120,status:"finished",orderTime:new Date(2026,5,4,15,20,15),},
        {id:3,name:"frenchFire",quantity:2,countdownTime:120,status:"InKitchen",orderTime:new Date(2026,5,4,16,20,15),}
     ],
     type:"delivery",
    },
    {id:"2",
     orderList:[{id:1,name:"fire_chicken",quantity:5,countdownTime:120,status:"Cook",orderTime:new Date(2026,5,2,17,20,15),}],
     type:"Onsite",
    },
    {id:"3",
     orderList:[{id:1,name:"Burger",quantity:2,countdownTime:100,status:"finished",orderTime:new Date(2026,5,2,18,20,15),}],
     type:"Onsite",
    }
]
