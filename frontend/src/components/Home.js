import { useEffect, useState } from "react"
import axios from "axios"
import Header from "./Header"
import MedicalReport from "./MedicalReport"


const Home = () => {

    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState([])

    const [currentReportIndex, setCurrentReportIndex] = useState(0);
    const currentReport = reports[currentReportIndex];

    useEffect(() => {
        axios.get("/v1/reports").then(res => 
            {
                setReports(res.data)
            })
            .catch(err => {console.log(err)});
    }, []);


    return (
        <>
        <div>
            <Header
                reports={reports} 
                currentReportIndex={currentReportIndex} 
                setCurrentReportIndex={setCurrentReportIndex} 
            />
            {currentReport && (
                <MedicalReport reportData={currentReport} />
            )}
            

        </div>

        
        </>
    )
}


export default Home