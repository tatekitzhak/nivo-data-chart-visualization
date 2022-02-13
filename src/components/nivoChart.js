import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import Avater1 from './avatars/avatar1';
import TopAvatars from '../components/avatars/topAvatars';
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
        var body_data={}
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
            <div className="row border-bottom">
                <div className="col"> Biobeat Icon </div>
                <TopAvatars/>
            </div>
            <div className="row">
                <div className="col-2">
                    <Avater1/>
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