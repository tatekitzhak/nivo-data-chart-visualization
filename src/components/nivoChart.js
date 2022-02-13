import React, { useEffect, useState } from "react";
import Chart from '../components/chart';
import Avater1 from './avatars/avatar1';
import TopAvatars from '../components/avatars/topAvatars';
import sbp_sbp from '../data.json';


function NivoResponsiveLine(props) {
    const api_info = props.api_info
    console.log('NivoResponsiveLine1:', api_info)
    console.log('NivoResponsiveLine2:', sbp_sbp)

    var defult_input = [
        {
            "id": "sbp",
            "color": "hsl(18, 70%, 50%)",
            "data": [{
                "x": "12:05",
                "y": 185
            }]
        },
        {
            "id": "dbp", "color": "hsl(79, 70%, 50%)",
            "data": [{
                "x": "12:05",
                "y": 185
            }]
        }];

    const [newData, setNewData] = useState(defult_input);
    const [xTickValues, setXTickValues] = useState([]);
    const [apiData, setApiData] = useState(api_info);
    useEffect(() => {
        var xTick = []
        var chart_input = [
            {
                "id": "sbp",
                "color": "hsl(18, 70%, 50%)",
                "data": []
            },
            {
                "id": "dbp", "color": "hsl(79, 70%, 50%)",
                "data": []
            }];

        apiData.sbp.data.forEach(function (a) {
            var time_parts = a.label.match(/.{2}/g)

            if (time_parts[4] % 5 == 0) {
                xTick.push(`${time_parts[3]}:${time_parts[4]}`)
            }
            chart_input[0].data.push({
                "x": `${time_parts[3]}:${time_parts[4]}`,
                "y": a.sbp
            })

        })

        apiData.dbp.data.forEach(function (a) {
            var time_parts = a.label.match(/.{2}/g)
            // if (time_parts[4] % 5 == 0) {
            chart_input[1].data.push({
                "x": `${time_parts[3]}:${time_parts[4]}`,
                "y": a.dbp
            })
            // }
        })

        setNewData(chart_input)
        setXTickValues(xTick)
        console.log(`newData: ${newData}`)

    }, []);

    return (
        <>
            <Chart newData={newData} xTickValues={xTickValues}>

            </Chart>
        </>
    );
}

function NivoChart(props) {
    const api_info = props.data;
    console.log('NivoChart:', props)
    return (
        <div className="container-fluid" >
            <div className="row border-bottom">
                <div className="col"> Biobeat Icon </div>
                <TopAvatars />
            </div>
            <div className="row">
                <div className="col-2">
                    <Avater1 />
                </div>
                <div className="col col-10 border-left">
                    <div className="row border-bottom">
                        <div className="col ">Blood pressure</div>
                        <div className="col ">Date</div>
                    </div>
                    <div className="row">
                        <div className="col col-10">
                            <div className="item">
                                <NivoResponsiveLine api_info={api_info} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NivoChart;