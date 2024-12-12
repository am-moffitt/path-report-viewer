


const Header = ({reports, currentReportIndex, setCurrentReportIndex}) => {




    return (
        <div style={{ marginBottom: '20px' }}>
      <h2>Medical Reports Viewer</h2>
      <div style={{ display: 'flex', gap: '10px', maxWidth: '70vw', overflow:'auto', marginLeft:'auto', marginRight:'auto' }}>
        {reports.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentReportIndex(index)}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              background: currentReportIndex === index ? '#007BFF' : '#f9f9f9',
              color: currentReportIndex === index ? '#fff' : '#000',
              cursor: 'pointer',
            }}
          >
            Report {index + 1}
          </button>
        ))}
      </div>
    </div>
    )
}

export default Header