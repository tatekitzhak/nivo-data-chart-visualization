import React, { useEffect, useState} from 'react';
import NivoChart from './components/nivoChart';

function App() {
    const [newData, setNewData] = useState('');
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
        }
    }

    useEffect(() => {
        /**
         * 
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
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'include', // include, *same-origin, omit
            headers: hdrs,
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(body_data) // body data type must match "Content-Type" header
        }

        fetch_biobeat_api('get-demo-data')
            .then(function (res) {
                setFetchData(res)
                console.log(`Fetch result:: ${res}`)
                console.log('res:',res)
            }).catch(error => {
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
                {console.log('fetchData:',fetchData)}
                {Object.keys(fetchData).length ? <NivoChart data={fetchData}></NivoChart> : <h1>Chart loading...</h1> }

            </div>
        </>
    );

}

export default App;
