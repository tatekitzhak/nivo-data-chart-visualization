import React, { useEffect, useState} from 'react';
import NivoChart from './components/nivoChart';
import sbp_sbp from './data.json';

function App() {
    const [fetchData, setFetchData] = useState({});
    async function fetch_biobeat_api(url) {
        try {
            let response = await fetch(url);
            if (!response.ok) {
                console.log(Error(`${response.status} ${response.statusText}`));
            }
            console.log('response::', response)
            let result = await response.json();

            return result;

        } catch (error) {
            
            // Errors param
            console.log(`Fetch error:${error} status:${error.status} error.error:${error.error} headers:${error.headers}`);
            return sbp_sbp;
        }
    }

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

        fetch_biobeat_api('get-demo-data')
            .then(function (res) {
                setFetchData(res)
                console.log('res:',res)
            }).catch(error => {
                setFetchData(sbp_sbp)
                console.log(`Error fetch_biobeat_api::${error}`)
            })

    }, []);

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <div className="App-header-text">Biobit Nivo data chart visualization</div>
                </header>
                <h1>Chart</h1>
                {Object.keys(fetchData).length ? <NivoChart data={fetchData}></NivoChart> : <h1>Chart loading...</h1> }

            </div>
        </>
    );

}

export default App;
