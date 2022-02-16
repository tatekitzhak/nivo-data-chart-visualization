import sbp_sbp from './data.json';

async function fetch_biobeat_api(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            console.log(Error(`${response.status} ${response.statusText}`));
        }
        let result = await response.json();
        return result;
    } catch (error) {
        // Errors param
        console.log(`Fetch error:${error} status:${error.status} error.error:${error.error} headers:${error.headers}`);
        return sbp_sbp;
    }
}

export {fetch_biobeat_api};