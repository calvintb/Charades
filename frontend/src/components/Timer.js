import React, { useRef, useEffect} from 'react'


export const Timer = ({timer, update}) => {
    const Ref = useRef(null);



    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60)

        return {total, seconds};
    }

    const startTimer = (e) => {
        let {total, seconds} = getTimeRemaining(e);
        if (total >= 0) {
            update(seconds > 9 ? seconds: '0' + seconds);
        }
    }

    const clearTimer = (e) => {
        update(timer);

        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
        return () => {
            console.log("I got unmounted");
            clearInterval(Ref.current);
          }
    }
    

    const getDeadTime = () => {
        let endtime = new Date();

        endtime.setSeconds(endtime.getSeconds() + Number(timer));
        return endtime;
    }

    useEffect(()=>{
        clearTimer(getDeadTime());
        return () => {
            console.log("I got unmounted");
            clearInterval(Ref.current);
          }
    },[]);


    return (
        <h2 style={{textAlign:"center"}}>{timer}</h2>
    )}