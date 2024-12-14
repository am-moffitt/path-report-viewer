import { useEffect, useRef, useState } from "react"
import axios from "axios"
import Header from "./Header"
import MedicalReport from "./MedicalReport"

import * as Constants from '../services/clientConstants';
import ClientUtil from '../services/clientUtil';

const Home = () => {

    const clientUtil = new ClientUtil();

    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState([])

    const [currentReportIndex, setCurrentReportIndex] = useState(0);

    if (!clientUtil.isEmpty(reports) && currentReportIndex >= reports.length) {
        setCurrentReportIndex(0);
        clientUtil.logDebug('............ Home: reports.length = ' + reports.length 
                            + '; currentReportIndex = ' + currentReportIndex);
    }

    const currentReport = reports[currentReportIndex];

    const dataType = useRef(Constants.DATA_TYPES.public);
    const getDataUrl = useRef(Constants.SERVER_ENDPOINTS.getPublicData);

    useEffect(() => {
        /*
       axios.get("/v1/reports").then(res => 
            {
                setReports(res.data)
            })
            .catch(err => {console.log(err)});
        */
        getData();
    }, []);

    const getData = () => {

        const funcName = 'Home.getData(): ';
        let logMesg = '';

        logMesg = 'getDataUrl.current = ' + getDataUrl.current;
        clientUtil.logDebug('======== ' + funcName + logMesg);

        if (!clientUtil.isEmpty(getDataUrl.current)) {

            axios.get(getDataUrl.current)
                .then(res => {
                    setReports(res.data);
                })
                .catch(err => {
                    console.log(err
                )});
        }

        logMesg = 'dataType.current = ' + dataType.current;
        clientUtil.logDebug('++++++ ' + funcName + logMesg);
    }

    const getPublicData = async (event) => {

        const funcName = 'Home.getPublicData(): ';
        let logMesg = '';

        dataType.current = Constants.DATA_TYPES.public;
        getDataUrl.current = Constants.SERVER_ENDPOINTS.getPublicData;

        logMesg = 'dataType.current = ' + dataType.current + '; getDataUrl.current = ' + getDataUrl.current;
        clientUtil.logDebug('---- ' + funcName + logMesg);

        getData();
    }

    const getSyntheticData = async (event) => {

        const funcName = 'Home.getSyntheticData(): ';
        let logMesg = '';

        dataType.current = Constants.DATA_TYPES.synthetic;
        getDataUrl.current = Constants.SERVER_ENDPOINTS.getSyntheticData;

        logMesg = 'dataType.current = ' + dataType.current + '; getDataUrl.current = ' + getDataUrl.current;
        clientUtil.logDebug('------ ' + funcName + logMesg);
            
        getData();
    }

    return (
        <>
            <div>
                <p/>
                <div>
                    <button type="button" className="btn btn-sm btn-outline-success appButton text-center"
                                onClick={e => {getPublicData(e)}}>
                            Public Data
                    </button>
                    &nbsp;&nbsp;
                    <button type="button" className="btn btn-sm btn-outline-success appButton text-center"
                                onClick={e => {getSyntheticData(e)}}>
                            Synthetic Data
                    </button>
                </div>
                <Header
                    reports={reports} 
                    currentReportIndex={currentReportIndex} 
                    setCurrentReportIndex={setCurrentReportIndex} 
                    dataType={dataType.current}
                />
                {currentReport && (
                    <MedicalReport reportData={currentReport} dataType={dataType.current} />
                )}
            </div>
        </>
    )
}

export default Home