import React, { useState, useEffect } from 'react';

const ProjectDetailsNew = () => {
  const [projectDetailsList, setProjectDetailsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjectDetails = searchTerm.trim() === '' 
    ? projectDetailsList 
    : projectDetailsList.filter(p =>
        p.applicantFullNames.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.applicantSurname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.siteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.applicantIdNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );

  useEffect(() => {
    loadProjectDetails();
  }, []);

  const loadProjectDetails = () => {
    setProjectDetailsList([
      {
        seqNo: 1,
        siteNumber: "8003",
        applicantIdNumber: "0101165484086",
        applicantFullNames: "CEPHUS",
        applicantSurname: "SIBANDA",
        excavation: true,
        g5Material: true,
        platform: false,
        foundation: false,
        wallplate: false,
        roof: false,
        plaster: false
      },
      {
        seqNo: 2,
        siteNumber: "8004",
        applicantIdNumber: "0201175595097",
        applicantFullNames: "MARIA",
        applicantSurname: "JOHNSON",
        excavation: true,
        g5Material: true,
        platform: true,
        foundation: false,
        wallplate: false,
        roof: false,
        plaster: false
      },
      {
        seqNo: 3,
        siteNumber: "8005",
        applicantIdNumber: "0301185606108",
        applicantFullNames: "JOHN",
        applicantSurname: "SMITH",
        excavation: true,
        g5Material: true,
        platform: true,
        foundation: true,
        wallplate: false,
        roof: false,
        plaster: false
      },
      {
        seqNo: 4,
        siteNumber: "8006",
        applicantIdNumber: "0401195717119",
        applicantFullNames: "SARAH",
        applicantSurname: "WILLIAMS",
        excavation: true,
        g5Material: true,
        platform: true,
        foundation: true,
        wallplate: true,
        roof: false,
        plaster: false
      }
    ]);
  };

  const goBack = () => {
    // Navigate back to Dashboard.js
    window.location.href = '/Dashboard';
  };

  const handleImport = () => {
    console.log('Import functionality');
  };

  const handleSearch = () => {
    console.log('Search functionality');
  };

  const handleExport = () => {
    console.log('Export functionality');
  };

  return (
    <div className="project-details-container">
      {/* Subtle Background Animation */}
      <div className="background-animation">
        <div className="floating-element elem-1"></div>
        <div className="floating-element elem-2"></div>
        <div className="floating-element elem-3"></div>
      </div>

      <div className="main-content">
        {/* Header Section */}
        <div className="header-section animate-slide-down">
          <div className="header-content">
            <button className="back-btn" onClick={goBack}>
              <svg className="back-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12,19 5,12 12,5"></polyline>
              </svg>
              <span className="back-text">Back</span>
            </button>

            <div className="nexgen-header">
              <span className="nexgen-systems">NEXGEN</span>
              <span className="systems-text">SYSTEMS</span>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="page-title-section animate-fade-in-up">
          <h2 className="page-title">PROJECT DETAILS</h2>
        </div>

        {/* Import Section */}
        <div className="import-section animate-fade-in-up">
          <button className="import-btn" onClick={handleImport}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7,10 12,15 17,10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            IMPORT
          </button>
        </div>

        {/* Search and Export Section */}
        <div className="search-export-section animate-fade-in-up">
          <div className="search-container">
            <input 
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="action-buttons">
            <button className="search-btn" onClick={handleSearch}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              SEARCH
            </button>
            <button className="export-btn" onClick={handleExport}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17,8 12,3 7,8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              EXPORT
            </button>
          </div>
        </div>

        {/* Project Details Table */}
        <div className="table-section animate-fade-in-up">
          {/* Desktop Table View */}
          <div className="table-container">
            <table className="project-details-table">
              <thead>
                <tr>
                  <th>Seq no</th>
                  <th>Site Number</th>
                  <th>Applicant ID Number</th>
                  <th>Applicant Full Names</th>
                  <th>Applicant Surname</th>
                  <th>Excavation</th>
                  <th>G5 Material</th>
                  <th>Platform</th>
                  <th>Foundation</th>
                  <th>Wallplate</th>
                  <th>Roof</th>
                  <th>Plaster</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjectDetails.map((item, index) => (
                  <tr key={index} className="table-row">
                    <td>{item.seqNo}</td>
                    <td>{item.siteNumber}</td>
                    <td>{item.applicantIdNumber}</td>
                    <td>{item.applicantFullNames}</td>
                    <td>{item.applicantSurname}</td>
                    <td className="milestone-cell">
                      {item.excavation && <span className="milestone-check">✓</span>}
                    </td>
                    <td className="milestone-cell">
                      {item.g5Material && <span className="milestone-check">✓</span>}
                    </td>
                    <td className="milestone-cell">
                      {item.platform && <span className="milestone-check">✓</span>}
                    </td>
                    <td className="milestone-cell">
                      {item.foundation && <span className="milestone-check">✓</span>}
                    </td>
                    <td className="milestone-cell">
                      {item.wallplate && <span className="milestone-check">✓</span>}
                    </td>
                    <td className="milestone-cell">
                      {item.roof && <span className="milestone-check">✓</span>}
                    </td>
                    <td className="milestone-cell">
                      {item.plaster && <span className="milestone-check">✓</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="mobile-cards">
            {filteredProjectDetails.map((item, index) => (
              <div key={index} className="mobile-detail-card">
                <div className="mobile-card-header">
                  <h3 className="applicant-name">{item.applicantFullNames} {item.applicantSurname}</h3>
                  <span className="sequence-badge">Seq: {item.seqNo}</span>
                </div>

                <div className="mobile-applicant-info">
                  <div className="info-row">
                    <span className="info-label">Site Number:</span>
                    <span className="info-value">{item.siteNumber}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">ID Number:</span>
                    <span className="info-value">{item.applicantIdNumber}</span>
                  </div>
                </div>

                <div className="mobile-milestones">
                  <div className="milestone-title">Project Milestones</div>
                  <div className="milestone-grid">
                    <div className={`milestone-item ${item.excavation ? 'completed' : ''}`}>
                      <div className="milestone-icon">
                        {item.excavation && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                        )}
                      </div>
                      <span>Excavation</span>
                    </div>
                    <div className={`milestone-item ${item.g5Material ? 'completed' : ''}`}>
                      <div className="milestone-icon">
                        {item.g5Material && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                        )}
                      </div>
                      <span>G5 Material</span>
                    </div>
                    <div className={`milestone-item ${item.platform ? 'completed' : ''}`}>
                      <div className="milestone-icon">
                        {item.platform && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                        )}
                      </div>
                      <span>Platform</span>
                    </div>
                    <div className={`milestone-item ${item.foundation ? 'completed' : ''}`}>
                      <div className="milestone-icon">
                        {item.foundation && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                        )}
                      </div>
                      <span>Foundation</span>
                    </div>
                    <div className={`milestone-item ${item.wallplate ? 'completed' : ''}`}>
                      <div className="milestone-icon">
                        {item.wallplate && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                        )}
                      </div>
                      <span>Wallplate</span>
                    </div>
                    <div className={`milestone-item ${item.roof ? 'completed' : ''}`}>
                      <div className="milestone-icon">
                        {item.roof && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                        )}
                      </div>
                      <span>Roof</span>
                    </div>
                    <div className={`milestone-item ${item.plaster ? 'completed' : ''}`}>
                      <div className="milestone-icon">
                        {item.plaster && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                        )}
                      </div>
                      <span>Plaster</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .project-details-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          position: relative;
          overflow: hidden;
        }

        /* Background Animation */
        .background-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-element {
          position: absolute;
          background: rgba(255, 0, 0, 0.03);
          border-radius: 50%;
          animation: float 10s ease-in-out infinite;
        }

        .elem-1 {
          width: 100px;
          height: 100px;
          top: 15%;
          left: 8%;
          animation-delay: 0s;
        }

        .elem-2 {
          width: 80px;
          height: 80px;
          top: 70%;
          right: 10%;
          animation-delay: -3s;
        }

        .elem-3 {
          width: 120px;
          height: 120px;
          bottom: 20%;
          left: 25%;
          animation-delay: -6s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
            opacity: 0.7;
          }
        }

        .main-content {
          flex: 1;
          background: transparent;
          overflow-y: auto;
          position: relative;
          z-index: 2;
        }

        /* Animations */
        @keyframes slideDown {
          0% {
            transform: translateY(-30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-down {
          animation: slideDown 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }

        /* Header Section */
        .header-section {
          background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
          padding: 25px 30px;
          position: relative;
          box-shadow: 0 4px 20px rgba(255, 0, 0, 0.2);
          overflow: hidden;
        }

        .header-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: headerShine 4s ease-in-out infinite;
        }

        @keyframes headerShine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .back-btn {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          padding: 10px 15px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 3;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) translateX(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .back-arrow {
          transition: transform 0.3s ease;
        }

        .back-btn:hover .back-arrow {
          transform: translateX(-2px);
        }

        .back-text {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .nexgen-header {
          color: white;
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .nexgen-systems {
          font-size: 36px;
          font-weight: 900;
          letter-spacing: 3px;
          margin-right: 20px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .systems-text {
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 2px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        /* Page Title Section */
        .page-title-section {
          padding: 25px 30px 15px 30px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          animation-delay: 0.2s;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: #333;
          margin: 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* Import Section */
        .import-section {
          padding: 15px 30px;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          animation-delay: 0.4s;
        }

        .import-btn {
          background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
          color: white;
          border: none;
          padding: 12px 25px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 4px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 3px 12px rgba(255, 0, 0, 0.3);
        }

        .import-btn:hover {
          background: linear-gradient(135deg, #e60000 0%, #b30000 100%);
          transform: translateY(-1px);
          box-shadow: 0 5px 15px rgba(255, 0, 0, 0.4);
        }

        /* Search and Export Section */
        .search-export-section {
          padding: 15px 30px 25px 30px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          animation-delay: 0.6s;
        }

        .search-container {
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          background: #f5f5f5;
          border-radius: 4px;
          font-size: 14px;
          color: #666;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: #ff0000;
          background: white;
          box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.1);
          outline: none;
          color: #333;
        }

        .search-input::placeholder {
          color: #999;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
        }

        .search-btn, .export-btn {
          padding: 12px 20px;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .search-btn {
          background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
          color: white;
          box-shadow: 0 3px 12px rgba(0, 102, 204, 0.3);
        }

        .export-btn {
          background: linear-gradient(135deg, #00cc66 0%, #009944 100%);
          color: white;
          box-shadow: 0 3px 12px rgba(0, 204, 102, 0.3);
        }

        .search-btn:hover {
          background: linear-gradient(135deg, #0052a3 0%, #003366 100%);
          transform: translateY(-1px);
          box-shadow: 0 5px 15px rgba(0, 102, 204, 0.4);
        }

        .export-btn:hover {
          background: linear-gradient(135deg, #00a352 0%, #007733 100%);
          transform: translateY(-1px);
          box-shadow: 0 5px 15px rgba(0, 204, 102, 0.4);
        }

        /* Table Section */
        .table-section {
          padding: 0 30px 30px 30px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          animation-delay: 0.8s;
        }

        .table-container {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .project-details-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          table-layout: fixed;
        }

        .project-details-table th {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 15px 8px;
          text-align: center;
          font-weight: 600;
          color: #333;
          border-bottom: 2px solid #dee2e6;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .project-details-table td {
          padding: 15px 8px;
          border-bottom: 1px solid #f0f0f0;
          color: #333;
          text-align: center;
          vertical-align: middle;
          font-size: 12px;
        }

        .table-row {
          transition: all 0.3s ease;
        }

        .table-row:hover {
          background: rgba(255, 0, 0, 0.02);
        }

        .table-row:last-child td {
          border-bottom: none;
        }

        .milestone-cell {
          text-align: center;
          width: 8%;
        }

        .milestone-check {
          color: #00cc66;
          font-weight: 700;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: rgba(0, 204, 102, 0.1);
          border-radius: 50%;
          border: 2px solid #00cc66;
        }

        /* Mobile Cards - Hidden on Desktop */
        .mobile-cards {
          display: none;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .nexgen-systems {
            font-size: 24px;
          }

          .systems-text {
            font-size: 16px;
          }

          .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .back-btn {
            position: static;
            transform: none;
            align-self: flex-start;
          }

          .nexgen-header {
            align-self: center;
          }

          .page-title-section {
            padding: 20px 15px 12px 15px;
          }

          .page-title {
            font-size: 22px;
            text-align: center;
          }

          .import-section {
            padding: 12px 15px;
          }

          .import-btn {
            width: 100%;
            justify-content: center;
          }

          .search-export-section {
            padding: 12px 15px 20px 15px;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .search-container {
            max-width: none;
          }

          .action-buttons {
            gap: 8px;
          }

          .search-btn, .export-btn {
            flex: 1;
            justify-content: center;
          }

          .table-section {
            padding: 0 15px 20px 15px;
          }

          /* Hide desktop table on mobile */
          .table-container {
            display: none;
          }

          /* Show mobile cards */
          .mobile-cards {
            display: block;
          }

          .mobile-detail-card {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            margin-bottom: 20px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
          }

          .mobile-detail-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
          }

          .mobile-card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
            padding-bottom: 12px;
            border-bottom: 1px solid #f0f0f0;
          }

          .applicant-name {
            font-size: 16px;
            font-weight: 700;
            color: #333;
            margin: 0;
            flex: 1;
            line-height: 1.2;
          }

          .sequence-badge {
            background: #ff0000;
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .mobile-applicant-info {
            margin-bottom: 18px;
          }

          .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            font-size: 13px;
          }

          .info-label {
            font-weight: 600;
            color: #666;
          }

          .info-value {
            color: #333;
            font-weight: 500;
          }

          .mobile-milestones {
            border-top: 1px solid #f0f0f0;
            padding-top: 15px;
          }

          .milestone-title {
            font-weight: 600;
            color: #333;
            font-size: 14px;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .milestone-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .milestone-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: #666;
            padding: 8px;
            border-radius: 6px;
            background: #f8f9fa;
            transition: all 0.3s ease;
          }

          .milestone-item.completed {
            background: rgba(0, 204, 102, 0.1);
            color: #00cc66;
            border: 1px solid rgba(0, 204, 102, 0.3);
          }

          .milestone-icon {
            width: 20px;
            height: 20px;
            border: 2px solid #ddd;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            transition: all 0.3s ease;
          }

          .milestone-item.completed .milestone-icon {
            border-color: #00cc66;
            background: #00cc66;
            color: white;
          }
        }

        @media (max-width: 480px) {
          .header-section {
            padding: 20px 15px;
          }

          .nexgen-systems {
            font-size: 20px;
          }

          .systems-text {
            font-size: 14px;
          }

          .page-title-section {
            padding: 15px 10px 10px 10px;
          }

          .page-title {
            font-size: 18px;
          }

          .import-section {
            padding: 10px;
          }

          .search-export-section {
            padding: 10px 10px 15px 10px;
          }

          .table-section {
            padding: 0 10px 15px 10px;
          }

          .mobile-detail-card {
            padding: 15px;
          }

          .applicant-name {
            font-size: 14px;
          }

          .milestone-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Column width adjustments for better fit */
        .project-details-table th:nth-child(1),
        .project-details-table td:nth-child(1) {
          width: 6%;
        }

        .project-details-table th:nth-child(2),
        .project-details-table td:nth-child(2) {
          width: 8%;
        }

        .project-details-table th:nth-child(3),
        .project-details-table td:nth-child(3) {
          width: 12%;
        }

        .project-details-table th:nth-child(4),
        .project-details-table td:nth-child(4) {
          width: 10%;
        }

        .project-details-table th:nth-child(5),
        .project-details-table td:nth-child(5) {
          width: 10%;
        }

        .project-details-table th:nth-child(n+6),
        .project-details-table td:nth-child(n+6) {
          width: 7.7%;
        }

        /* Large desktop optimizations */
        @media (min-width: 1400px) {
          .search-export-section {
            padding: 20px 30px 30px 30px;
          }

          .project-details-table {
            font-size: 14px;
          }

          .project-details-table th {
            padding: 18px 10px;
            font-size: 12px;
          }

          .project-details-table td {
            padding: 18px 10px;
            font-size: 13px;
          }

          .milestone-check {
            width: 22px;
            height: 22px;
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetailsNew;