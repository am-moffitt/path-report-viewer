import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';

// import * as Constants from '../services/clientConstants';
import ClientUtil from '../services/clientUtil';

const MedicalReport = ({ reportData, dataType }) => {

    const clientUtil = new ClientUtil();

    const [error, setError] = useState(null);
    const [organ, setOrgan] = useState('');

    clientUtil.logDebug('>>>>>>>> MedicalReport: dataType = ' + dataType);
  
    useEffect(() => {
      const funcName = 'MedicalReport.useEffect(): ';
      let logMesg = '';

      if (clientUtil.isEmpty(reportData)) {
        setError('Invalid data structure. Ensure it contains diagnosis1, diagnosis2, and diagnosis3 fields.');

      } else {
        setError(null);

        if (!clientUtil.isEmpty(dataType) && dataType === 'Public' ) {
          if (!clientUtil.isEmpty(reportData.organ)) {
            setOrgan(reportData.organ);
          }
        } else {
          const stage1OutputStr = (reportData && reportData['stage_1_output']) ? reportData['stage_1_output'] : '';

          if (!clientUtil.isEmpty(stage1OutputStr)) {
            let match = stage1OutputStr.match(/Site.*?:\s*"([^"]+)"/);
            if (!clientUtil.isEmpty(match) && match.length > 1) {
              logMesg = 'match = ' + JSON.stringify(match);
              clientUtil.logDebug('---- ' + funcName + logMesg);

              setOrgan(match[1]);
            }
          }
        }

        logMesg = ' reportData.pdf_file_name = ' + (reportData.pdf_file_name ?? '') + '; organ = ' + organ;
        clientUtil.logDebug('---- ' + funcName + logMesg);
      }
    }, [dataType, reportData]);
  
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!error && reportData && (
          <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h3>Diagnosis Report</h3> 
            {/*-- <p>Organ: {reportData.organ}</p> */}
            <p>Organ: {organ}</p>
            <p><strong> Pathology Report :</strong> {reportData.text}</p>
            <div>
              <strong>AI Extraction (using LLM 1):</strong>
              <div style={{ margin: '10px 0', padding: '10px', background: '#f9f9f9', borderRadius: '5px', border: '1px solid #ddd' }}>
                <ReactMarkdown>{reportData.stage_1_output}</ReactMarkdown>
              </div>
            </div>
            {/* Stage 2 */}
            <div>
              <strong>AI Evaluation (using LLM 2):</strong>
              <div style={{ margin: '10px 0', padding: '10px', background: '#f9f9f9', borderRadius: '5px', border: '1px solid #ddd' }}>
                <ReactMarkdown>{reportData.stage_2_output}</ReactMarkdown>
              </div>
            </div>
            {/* Stage 3 */}
            <div>
              <strong>Final Output (using LLM 3):</strong>
              <div style={{ margin: '10px 0', padding: '10px', background: '#f9f9f9', borderRadius: '5px', border: '1px solid #ddd' }}>
                <ReactMarkdown>{reportData.stage_3_output}</ReactMarkdown>
              </div>
            </div>

          </div>
        )}
      </div>
    );
  };
  
  export default MedicalReport;
  


