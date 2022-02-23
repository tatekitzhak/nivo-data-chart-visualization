import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";

function SliceTooltip(props) {
    const slice = props.slice;
    const date = props.date;
    return (
        <>
            <div className="border border-primary bg-white rounded">

                <span> {`${date}`}</span>
                {slice.points.map(point => (
                    <div key={point.id}>

                        <span style={{ color: point.serieColor }}>
                            {`${point.serieId} ${point.data.yFormatted}`}
                        </span>
                    </div>
                ))}
            </div>
        </>
    )

}
function Chart(props) {
    const newData = props.newData;
    const xTickValues = props.xTickValues;
    const sbpColor = newData[0].color;
    const dbpColor = newData[1].color;
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
                colors={[sbpColor, dbpColor]}
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
                        <>
                            <SliceTooltip slice={slice} date={date}>

                            </SliceTooltip>
                        </>
                    );
                }}
                tooltipFormat={value => {
                    return value;
                }}
                useMesh={true}
                layers={ true ? ["grid","lines","slices","axes"]: undefined }
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

export default Chart;