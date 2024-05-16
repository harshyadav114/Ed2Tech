import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-hot-toast'

const initialState={
    totalitems:localStorage.getItem("totalitems")
    ? JSON.parse(localStorage.getItem("totalitems"))
    : 0,
    cart:localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    :[],
    totalcost:localStorage.getItem('totalcost')
    ?JSON.parse(localStorage.getItem('totalcost'))
    :0
}

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addtocart:(state,action)=>{
            const course=action.payload;
            console.log(state.cart.findIndex((val)=>val._id===course._id))
            const courseid=state.cart.findIndex((val)=>val._id===course._id);

            if(courseid!==-1){
                toast.error('Already in Cart!')
                return
            }

            state.cart.push(course);
            state.totalitems++;
            state.totalcost+=course.price

            localStorage.setItem('cart', JSON.stringify(state.cart));
            localStorage.setItem('totalitems', JSON.stringify(state.totalitems));
            localStorage.setItem('totalcost', JSON.stringify(state.totalcost));
            toast.success("Course added to cart")
        },
        removefromcart:(state,action)=>{
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)

            if (index >= 0) {
                
                state.totalitems--
                state.totalcost -= state.cart[index].price
                state.cart.splice(index, 1)
            
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("totalcost", JSON.stringify(state.totalcost))
                localStorage.setItem("totalitems", JSON.stringify(state.totalitems))
                
                toast.success("Course removed from cart")
            }
        },
        resetcart: (state) => {
            state.cart = []
            state.totalcost = 0
            state.totalitems = 0
      
            localStorage.removeItem("cart")
            localStorage.removeItem("totalcost")
            localStorage.removeItem("totalitems")
          }
        }
});

export const {addtocart,removefromcart,resetcart} = cartSlice.actions;
export default cartSlice.reducer;