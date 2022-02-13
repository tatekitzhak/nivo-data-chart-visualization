import React, { useEffect } from 'react';
import NivoChart from './components/nivoChart';

function App() {

    useEffect(() => {
        var data;
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
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }
        async function fetch_biobeat_api(url) {

            try {
                let response = await fetch(url);
                if (!response.ok) {
                    console.log(Error(`${response.status} ${response.statusText}`));
                }
                console.log('response:', response)
                let data = await response.json();

                return data;

            } catch (error) {
                // Errors param
                console.log(`Fetch error:${error} status:${error.status} error.error:${error.error} headers:${error.headers}`);

            }

        }

        fetch_biobeat_api('get-demo-data')
            .then(function (data) {
                console.log(`data:: ${data}`)
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
                <NivoChart></NivoChart>
            </div>
        </>
    );

}

export default App;
