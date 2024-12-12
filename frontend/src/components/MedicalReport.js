import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';




const MedicalReport = ({ reportData }) => {
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!reportData ) {
        setError('Invalid data structure. Ensure it contains diagnosis1, diagnosis2, and diagnosis3 fields.');
      } else {
        setError(null);
      }
    }, [reportData]);
  
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!error && reportData && (
          <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h3>Diagnosis Report</h3>
            <p>Organ: {reportData.organ}</p>
            <p><strong> Pathology Report :</strong> {reportData.text}</p>
            <div>
              <strong>AI Extraction:</strong>
              <div style={{ margin: '10px 0', padding: '10px', background: '#f9f9f9', borderRadius: '5px', border: '1px solid #ddd' }}>
                <ReactMarkdown>{reportData.stage_1_output}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default MedicalReport;
  


