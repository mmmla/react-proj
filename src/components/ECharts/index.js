import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';



const MyECharts=({style,option})=>{
    const ref=useRef(null)
    const mychart=useRef(null)//?为什么要用useref
    useEffect(()=>{
        !mychart.current&&(mychart.current=echarts.init(ref.current))
         mychart.current.setOption(option)
    },[option])

    return (
        <div style={style} ref={ref}></div>
    )
}

export default MyECharts