import React, { useEffect, useState} from 'react';
import NivoChart from './components/nivoChart';
import sbp_sbp from './data.json';
import {fetch_biobeat_api} from './data/fetch_api';


function App() {
    const [fetchData, setFetchData] = useState({});

    useEffect(() => {
        /**
         * fetching
         */
        var body_data={};
        var hdrs = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }

        var params = {
            method: 'GET', 
            mode: 'no-cors', 
            cache: 'no-cache', 
            credentials: 'include', 
            headers: hdrs,
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(body_data)
        }
        /** Origin API:
         * https://biobeat-demo-data.eu.bio-beat.cloud/get-demo-data
         */
        
        fetch_biobeat_api('get-demo-data')
            .then(function (res) {
                setFetchData(res)
            }).catch(error => {
                setFetchData(sbp_sbp)
                console.log(`Error fetch_biobeat_api::${error}`)
            })

    }, []);

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <div className="App-header-text">Biobeat Nivo data chart visualization</div>
                </header>
                <h1>Chart</h1>
                {Object.keys(fetchData).length ? <NivoChart data={fetchData}></NivoChart> : <h1>Chart loading...</h1> }

            </div>
        </>
    );

}

export default App;
