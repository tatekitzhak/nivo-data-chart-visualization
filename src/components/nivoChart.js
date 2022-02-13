import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import Avater1 from './avatars/avatar1';

import sbp_sbp from '../data.json';
function NivoResponsiveLine(props) {
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

        sbp_sbp.sbp.data.forEach(function (a) {
            var time_parts = a.label.match(/.{2}/g)

            if (time_parts[4] % 5 == 0) {
                xTick.push(`${time_parts[3]}:${time_parts[4]}`)
            }
            chart_input[0].data.push({
                "x": `${time_parts[3]}:${time_parts[4]}`,
                "y": a.sbp
            })

        })


        sbp_sbp.dbp.data.forEach(function (a) {
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
        async function fetch_biobeat_api(url) {

            try {
                let response = await fetch(url);
                if (!response.ok) {
                    console.log(Error(`${response.status} ${response.statusText}`));
                }
                console.log(`response:${response}`)
                let data = await response.json();

                return data;

            } catch (error) {
                // Errors param
                console.log(`Fetch error:${error} status:${error.status} error.error:${error.error} headers:${error.headers}`);
                
            }

        }

        fetch_biobeat_api('get-demo-data')
            .then(function (data) {
                console.log(`fetch_biobeat_api data::${data}`)
            }).catch(error => {
                console.log(`Error fetch_biobeat_api:${error}`)
            })
    }, []);
    return (
        <>
            <ResponsiveLine
                data={newData}

                margin={{
                    top: 50,
                    right: 110,
                    bottom: 50,
                    left: 60
                }}
                // tooltip={() => {
                //     return <div>{'tickValues'}</div>;
                // }}
                yScale={{ type: 'linear', max: 190, min: 60 }}
                // xScale={{
                //     type: 'time',
                //     format: "%y%m%d%H:%M:%S",
                //     useUTC: false,
                //     precision: 'second',
                // }}
                // xFormat="time:%y%m%d%H:%M:%S"

                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                enableGridX={false}
                axisTop={null}
                axisRight={null}
                minY="auto"
                maxY="auto"
                stacked={true}
                curve="cardinal"
                enableStackTooltip={false}

                axisBottom={{
                    orient: 'bottom',
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendOffset: 36,
                    tickValues: xTickValues,
                }}

                axisLeft={{
                    orient: "left",
                    tickSize: 0,
                    tickPadding: 8,
                    tickRotation: 0,
                    legend: "",
                    legendOffset: -40
                }}
                colors={["#1E90FF"]}
                useMesh={true}
                pointSize={0}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                enableSlices={"x"}
                sliceTooltip={({ slice }) => {
                    const date = slice.points[0].data.xFormatted;
                    return (
                        <div>

                            <span> {`${date}`}</span>
                            {slice.points.map(point => (
                                <div key={point.id}>

                                    <span style={{ color: point.serieColor }}>
                                        {`${point.serieId} ${point.data.yFormatted}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    );
                }}
                tooltipFormat={value => {
                    // console.log("value: ", value);

                    return value;
                }}

                useMesh={true}
                layers={
                    true
                        ? [
                            "grid",
                            "lines",
                            "slices",
                            "axes",

                        ]
                        : undefined
                }

                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />

        </>
    );
}


function NivoChart() {
    return (
        <div className="container-fluid" >
            {/* <MyResponsiveLine data={data} /> */}

            <div className="row border-bottom">
                <div className="col">
                    Biobeat Icon
                </div>
                <div className="col-10 border-left">
                    <div className="row">
                        <div className="col">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                            </svg>
                        </div>
                        <div className="col">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
                            </svg>

                        </div>
                        <div className="col"><Avater1 /></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-2">

                    <div className="row">
                        <div className="col">
                            <Avater1></Avater1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"><Avater1 /></div>
                    </div>
                    <div className="row">
                        <div className="col"><Avater1 /></div>
                    </div>
                </div>
                <div className="col col-10 border-left">
                    <div className="row border-bottom">
                        <div className="col ">Blood pressure</div>
                        <div className="col ">Date</div>
                    </div>
                    <div className="row">
                        <div className="col col-10">
                            <div className="item">
                                <NivoResponsiveLine />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}


export default NivoChart;