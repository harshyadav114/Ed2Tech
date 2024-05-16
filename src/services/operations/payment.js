import {studentEndpoints} from '../Apiendpoints';
import {toast} from 'react-hot-toast';
import {apiconnector} from '../Apiconnector';
import logo from '../../assets/Logo/blacklogo (1).png';
import { setPaymentloading } from '../../Slicer/courseSlicer';
import { resetcart } from '../../Slicer/cartSlicer';



const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API
}=studentEndpoints;

function loadscript(src){
        return new Promise((resolve)=>{
            const script=document.createElement('script');
            script.src=src;

            script.onload=()=>{
                resolve(true)
            }

            script.onerror=()=>{
                resolve(false)
            }
            document.body.appendChild(script)
        })
}

export const createorder=async(token, courses, userDetails, navigate, dispatch)=>{
    const toastid=toast.loading('loading...')
    try{
        const res = await loadscript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }
        //console.log('heloo')
        const orderResponse = await apiconnector("POST", COURSE_PAYMENT_API, 
                                {courses},
                                {
                                    Authorization: `Bearer ${token}`,
                                })
        //console.log(orderResponse);

        if(!orderResponse.data.success) {
            throw new Error('err');
        }

        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"Edulity | Powered by aZinc",
            description: "Thank You for Purchasing the Course",
            image:logo,
            prefill: {
                name:`${userDetails.firstname}`,
                email:userDetails.email
            },
            handler: async function(response) {
                
                await sendPaymentSuccessEmail(response, orderResponse.data.data.amount,token );
                await verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }
        
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            //console.log(response.error);
        })

    }catch(error){
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastid);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        //console.log(response)
        await apiconnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderid: response.razorpay_order_id,
            paymentid: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentloading(true));
    try{
        const response  = await apiconnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolledcourses");
        dispatch(resetcart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentloading(false));
}