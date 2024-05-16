export const hourminsec = (sec)=>{
    let hour=0;
    let minute=0;
    let second=0;
    if(sec>=3600){
        hour=Math.round(sec/3600);
        sec-=3600
    }
    if(sec>=60){
        minute=Math.round(sec/60);
        sec-=60
    }
    second=sec;
    const hms={
        hour:hour,
        minute:minute,
        second:second
    }
    return hms;
}
