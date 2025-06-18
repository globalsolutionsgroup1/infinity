import React, { useState, useEffect, useRef } from 'react';

const AddNewProject = () => {
  const [newProject, setNewProject] = useState({
    name: '',
    code: '',
    location: '',
    type: '',
    description: '',
    startDate: null,
    endDate: null,
    priority: 'Standard',
    budget: null,
    supervisorId: '',
    autoStart: false,
    emailNotifications: true,
    publicVisibility: false,
    requireApproval: true
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [availableSupervisors, setAvailableSupervisors] = useState([]);

  // File upload state
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [csvData, setCsvData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);

  useEffect(() => {
    loadAvailableSupervisors();
  }, []);

  const loadAvailableSupervisors = () => {
    setAvailableSupervisors([
      {
        id: '1',
        name: 'John April',
        department: 'Construction',
        experience: 8,
        activeProjects: 3,
        email: 'john.april@nexgen.co.za'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        department: 'Engineering',
        experience: 12,
        activeProjects: 2,
        email: 'sarah.johnson@nexgen.co.za'
      },
      {
        id: '3',
        name: 'Mike Davis',
        department: 'Quality Control',
        experience: 6,
        activeProjects: 4,
        email: 'mike.davis@nexgen.co.za'
      },
      {
        id: '4',
        name: 'Lisa Wilson',
        department: 'Safety',
        experience: 10,
        activeProjects: 1,
        email: 'lisa.wilson@nexgen.co.za'
      },
      {
        id: '5',
        name: 'David Brown',
        department: 'Construction',
        experience: 15,
        activeProjects: 2,
        email: 'david.brown@nexgen.co.za'
      }
    ]);
  };

  const handleSupervisorChange = (supervisorId) => {
    setNewProject(prev => ({ ...prev, supervisorId }));
  };

  // Sidebar methods
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const closeSidebar = () => setSidebarCollapsed(true);
  const toggleUserDropdown = () => setShowUserDropdown(!showUserDropdown);

  const handleLogout = () => {
    window.location.href = '/Login';
  };

  const goBack = () => {
    window.location.href = '/Dashboard';
  };

  // File upload methods
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setUploadedFile({
          name: file.name,
          size: file.size
        });
        setUploadStatus('File uploaded successfully');
      } else {
        setUploadStatus('Please upload a CSV file only');
      }
    }
  };

  const handleFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: file.size
      });
      setUploadStatus('File uploaded successfully');
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadStatus('');
    setCsvData([]);
    setCsvHeaders([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const processFile = async () => {
    if (uploadedFile) {
      setUploadStatus('Processing CSV file...');
      
      // Simulate CSV processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock CSV data
      const headers = ['Task ID', 'Task Name', 'Assignee', 'Start Date', 'End Date', 'Status'];
      const data = [
        {
          'Task ID': 'T001',
          'Task Name': 'Foundation Excavation',
          'Assignee': 'Team A',
          'Start Date': '2025-06-15',
          'End Date': '2025-06-20',
          'Status': 'Pending'
        },
        {
          'Task ID': 'T002',
          'Task Name': 'Concrete Pouring',
          'Assignee': 'Team B',
          'Start Date': '2025-06-21',
          'End Date': '2025-06-25',
          'Status': 'Pending'
        },
        {
          'Task ID': 'T003',
          'Task Name': 'Rebar Installation',
          'Assignee': 'Team C',
          'Start Date': '2025-06-18',
          'End Date': '2025-06-22',
          'Status': 'Pending'
        }
      ];

      setCsvHeaders(headers);
      setCsvData(data);
      setUploadStatus(`Successfully processed ${data.length} records`);
    }
  };

  const formatFileSize = (bytes) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    let len = bytes;
    let order = 0;
    while (len >= 1024 && order < sizes.length - 1) {
      order++;
      len = len / 1024;
    }
    return `${len.toFixed(2)} ${sizes[order]}`;
  };

  const saveProject = () => {
    // Validation logic
    if (!newProject.name.trim() || !newProject.location.trim() || 
        !newProject.supervisorId.trim() || !newProject.startDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Save project logic here
    alert('Project saved successfully!');
    window.location.href = '/Dashboard';
  };

  const cancel = () => {
    window.location.href = '/Dashboard';
  };

  const selectedSupervisor = availableSupervisors.find(s => s.id === newProject.supervisorId);

  return (
    <div className="app-container">
      {/* Left Sidebar Navigation */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} id="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-text">NEXGEN</span>
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/Dashboard" className="nav-link">
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Dashboard</span>
              </a>
            </li>

            <li className="nav-item dropdown" onClick={toggleUserDropdown}>
              <div className={`nav-link dropdown-toggle ${showUserDropdown ? 'expanded' : ''}`}>
                <span className="nav-icon">👥</span>
                <span className="nav-text">Manage Users</span>
                <span className="dropdown-arrow">▼</span>
              </div>
              <ul className={`dropdown-menu ${showUserDropdown ? 'show' : ''}`}>
                <li className="dropdown-item">
                  <a href="/AddNewUser" className="dropdown-link">
                    <span className="dropdown-icon">➕</span>
                    <span className="dropdown-text">Add New User</span>
                  </a>
                </li>
                <li className="dropdown-item">
                  <a href="/EditUser" className="dropdown-link">
                    <span className="dropdown-icon">✏️</span>
                    <span className="dropdown-text">Edit User</span>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="/Reports" className="nav-link">
                <span className="nav-icon">📊</span>
                <span className="nav-text">Reports</span>
              </a>
            </li>

            <li className="nav-item">
              <a href="/Invoicing" className="nav-link">
                <span className="nav-icon">💰</span>
                <span className="nav-text">Invoicing</span>
              </a>
            </li>

            <li className="nav-item">
              <a href="/Claims" className="nav-link">
                <span className="nav-icon">📋</span>
                <span className="nav-text">Claims</span>
              </a>
            </li>
          </ul>

          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>
              <span className="nav-icon">🚪</span>
              <span className="nav-text">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Sidebar Overlay for Mobile */}
      <div className={`sidebar-overlay ${sidebarCollapsed ? '' : 'show'}`} onClick={closeSidebar}></div>

      {/* Main Content Area */}
      <div className={`main-wrapper ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="add-project-container">
          <div className="main-content">
            {/* Header Section */}
            <div className="header-section animate-slide-down">
              <div className="header-content">
                <button className="desktop-menu-btn" onClick={toggleSidebar}>
                  <span className="hamburger"></span>
                  <span className="hamburger"></span>
                  <span className="hamburger"></span>
                </button>
                <button className="mobile-menu-btn" onClick={toggleSidebar}>
                  <span className="hamburger"></span>
                  <span className="hamburger"></span>
                  <span className="hamburger"></span>
                </button>
                <div className="nexgen-header">
                  <span className="nexgen-systems">NEXGEN</span>
                  <span className="systems-text">SYSTEMS</span>
                </div>
              </div>
              <div className="page-subtitle">
                <button className="dashboard-btn" onClick={goBack}>
                  <span className="dashboard-icon">🏠</span>
                  <span className="dashboard-text">BACK TO DASHBOARD</span>
                </button>
                ADD NEW PROJECT
              </div>
            </div>

            {/* Form Section */}
            <div className="form-section animate-fade-in-up">
              <div className="form-container">
                <div className="form-header">
                  <div className="header-left">
                    <button className="back-btn" onClick={goBack}>
                      <span className="back-icon">←</span>
                      <span className="back-text">BACK</span>
                    </button>
                    <h2 className="form-title">PROJECT INFORMATION</h2>
                  </div>
                  <div className="form-actions">
                    <button className="btn-secondary" onClick={cancel}>CANCEL</button>
                    <button className="btn-primary" onClick={saveProject}>SAVE PROJECT</button>
                  </div>
                </div>

                <div className="form-content">
                  {/* Basic Project Information Section */}
                  <div className="form-section-card animate-scale-in" style={{animationDelay: '0.2s'}}>
                    <div className="section-header">
                      <h3 className="section-title">BASIC INFORMATION</h3>
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">PROJECT NAME *</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={newProject.name}
                          onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                          placeholder="Enter project name" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">PROJECT CODE</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={newProject.code}
                          onChange={(e) => setNewProject({...newProject, code: e.target.value})}
                          placeholder="Enter project code" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">LOCATION *</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={newProject.location}
                          onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                          placeholder="Enter project location" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">PROJECT TYPE</label>
                        <select 
                          className="form-select" 
                          value={newProject.type}
                          onChange={(e) => setNewProject({...newProject, type: e.target.value})}
                        >
                          <option value="">Select project type</option>
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Infrastructure">Infrastructure</option>
                        </select>
                      </div>
                      <div className="form-group full-width">
                        <label className="form-label">DESCRIPTION</label>
                        <textarea 
                          className="form-textarea" 
                          value={newProject.description}
                          onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                          placeholder="Enter project description" 
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Project Timeline Section */}
                  <div className="form-section-card animate-scale-in" style={{animationDelay: '0.4s'}}>
                    <div className="section-header">
                      <h3 className="section-title">PROJECT TIMELINE</h3>
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">START DATE *</label>
                        <input 
                          type="date" 
                          className="form-input" 
                          value={newProject.startDate || ''}
                          onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">ESTIMATED END DATE</label>
                        <input 
                          type="date" 
                          className="form-input" 
                          value={newProject.endDate || ''}
                          onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">PRIORITY LEVEL</label>
                        <select 
                          className="form-select" 
                          value={newProject.priority}
                          onChange={(e) => setNewProject({...newProject, priority: e.target.value})}
                        >
                          <option value="Standard">Standard</option>
                          <option value="High">High Priority</option>
                          <option value="Critical">Critical</option>
                          <option value="Emergency">Emergency</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">BUDGET (ZAR)</label>
                        <input 
                          type="number" 
                          className="form-input" 
                          value={newProject.budget || ''}
                          onChange={(e) => setNewProject({...newProject, budget: parseFloat(e.target.value) || null})}
                          placeholder="0.00" 
                          step="0.01" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Supervisor Assignment Section */}
                  <div className="form-section-card supervisor-section animate-scale-in" style={{animationDelay: '0.6s'}}>
                    <div className="section-header">
                      <h3 className="section-title">SUPERVISOR ASSIGNMENT</h3>
                      <div className="section-badge">REQUIRED</div>
                    </div>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label className="form-label">ASSIGN SUPERVISOR *</label>
                        <select 
                          className="form-select" 
                          value={newProject.supervisorId}
                          onChange={(e) => handleSupervisorChange(e.target.value)}
                        >
                          <option value="">Select a supervisor</option>
                          {availableSupervisors.map(supervisor => (
                            <option key={supervisor.id} value={supervisor.id}>
                              {supervisor.name} - {supervisor.department}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Supervisor Details Preview */}
                    {newProject.supervisorId && selectedSupervisor && (
                      <div className="supervisor-preview animate-fade-in-up">
                        <div className="preview-header">
                          <h4>SUPERVISOR DETAILS</h4>
                        </div>
                        <div className="preview-content">
                          <div className="preview-item">
                            <span className="preview-label">Name:</span>
                            <span className="preview-value">{selectedSupervisor.name}</span>
                          </div>
                          <div className="preview-item">
                            <span className="preview-label">Department:</span>
                            <span className="preview-value">{selectedSupervisor.department}</span>
                          </div>
                          <div className="preview-item">
                            <span className="preview-label">Experience:</span>
                            <span className="preview-value">{selectedSupervisor.experience} years</span>
                          </div>
                          <div className="preview-item">
                            <span className="preview-label">Current Projects:</span>
                            <span className="preview-value">{selectedSupervisor.activeProjects}</span>
                          </div>
                          <div className="preview-item">
                            <span className="preview-label">Email:</span>
                            <span className="preview-value">{selectedSupervisor.email}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CSV File Upload Section */}
                  <div className="form-section-card upload-section animate-scale-in" style={{animationDelay: '0.8s'}}>
                    <div className="section-header">
                      <h3 className="section-title">PROJECT DATA IMPORT</h3>
                      <div className="section-badge csv">CSV UPLOAD</div>
                    </div>
                    <div className="upload-area">
                      <div 
                        className={`upload-zone ${isDragOver ? 'drag-over' : ''}`}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleFileDrop}
                      >
                        {!uploadedFile ? (
                          <div className="upload-content">
                            <div className="upload-icon">📄</div>
                            <h4 className="upload-title">Upload Project Data CSV</h4>
                            <p className="upload-description">
                              Drag and drop your CSV file here, or click to browse
                            </p>
                            <button type="button" className="upload-btn" onClick={triggerFileInput}>
                              BROWSE FILES
                            </button>
                            <input 
                              type="file"
                              accept=".csv"
                              ref={fileInputRef}
                              onChange={handleFileSelected}
                              style={{display: 'none'}} 
                            />
                            <div className="upload-info">
                              <small>Supported format: CSV files only</small>
                              <small>Maximum file size: 10MB</small>
                            </div>
                          </div>
                        ) : (
                          <div className="file-preview">
                            <div className="file-info">
                              <div className="file-icon">✅</div>
                              <div className="file-details">
                                <h4 className="file-name">{uploadedFile.name}</h4>
                                <p className="file-size">{formatFileSize(uploadedFile.size)}</p>
                                <p className="file-status">{uploadStatus}</p>
                              </div>
                            </div>
                            <div className="file-actions">
                              <button type="button" className="btn-secondary small" onClick={removeFile}>
                                REMOVE
                              </button>
                              <button type="button" className="btn-primary small" onClick={processFile}>
                                PROCESS CSV
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {csvData.length > 0 && (
                        <div className="csv-preview animate-fade-in-up">
                          <div className="csv-header">
                            <h4>CSV DATA PREVIEW</h4>
                            <span className="csv-count">{csvData.length} rows imported</span>
                          </div>
                          <div className="csv-table-container">
                            <table className="csv-table">
                              <thead>
                                <tr>
                                  {csvHeaders.slice(0, 6).map((header, index) => (
                                    <th key={index}>{header}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {csvData.slice(0, 5).map((row, rowIndex) => (
                                  <tr key={rowIndex}>
                                    {csvHeaders.slice(0, 6).map((header, colIndex) => (
                                      <td key={colIndex}>{row[header] || ''}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Settings Section */}
                  <div className="form-section-card animate-scale-in" style={{animationDelay: '1.0s'}}>
                    <div className="section-header">
                      <h3 className="section-title">PROJECT SETTINGS</h3>
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <div className="checkbox-group">
                          <input 
                            type="checkbox" 
                            id="autoStart" 
                            checked={newProject.autoStart}
                            onChange={(e) => setNewProject({...newProject, autoStart: e.target.checked})}
                          />
                          <label htmlFor="autoStart" className="checkbox-label">Auto-start project on creation</label>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="checkbox-group">
                          <input 
                            type="checkbox" 
                            id="emailNotifications" 
                            checked={newProject.emailNotifications}
                            onChange={(e) => setNewProject({...newProject, emailNotifications: e.target.checked})}
                          />
                          <label htmlFor="emailNotifications" className="checkbox-label">Enable email notifications</label>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="checkbox-group">
                          <input 
                            type="checkbox" 
                            id="publicVisibility" 
                            checked={newProject.publicVisibility}
                            onChange={(e) => setNewProject({...newProject, publicVisibility: e.target.checked})}
                          />
                          <label htmlFor="publicVisibility" className="checkbox-label">Make project publicly visible</label>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="checkbox-group">
                          <input 
                            type="checkbox" 
                            id="requireApproval" 
                            checked={newProject.requireApproval}
                            onChange={(e) => setNewProject({...newProject, requireApproval: e.target.checked})}
                          />
                          <label htmlFor="requireApproval" className="checkbox-label">Require approval for milestone completion</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .app-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow: hidden;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 260px;
          background: linear-gradient(180deg, #ff0000 0%, #cc0000 100%);
          color: white;
          transition: all 0.3s ease;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 1000;
          box-shadow: 2px 0 10px rgba(255, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
        }

        .sidebar-header {
          padding: 25px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.15);
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logo-text {
          font-size: 26px;
          font-weight: 900;
          letter-spacing: 2px;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .sidebar-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          flex-direction: column;
          gap: 3px;
          padding: 8px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .sidebar-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .hamburger {
          width: 20px;
          height: 2px;
          background: white;
          transition: all 0.3s ease;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 25px 0;
        }

        .nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
        }

        .nav-item {
          margin-bottom: 5px;
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 18px 25px;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          border-left: 4px solid transparent;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border-left-color: white;
        }

        .nav-item.active .nav-link {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border-left-color: white;
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .nav-icon {
          font-size: 20px;
          margin-right: 15px;
          width: 24px;
          text-align: center;
        }

        .nav-text {
          font-size: 15px;
          font-weight: 600;
          flex: 1;
        }

        /* Dropdown Styles */
        .dropdown {
          position: relative;
        }

        .dropdown-toggle {
          justify-content: space-between;
        }

        .dropdown-arrow {
          font-size: 12px;
          transition: all 0.3s ease;
          margin-left: auto;
        }

        .dropdown-toggle.expanded .dropdown-arrow {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          list-style: none;
          margin: 0;
          padding: 0;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          background: rgba(0, 0, 0, 0.2);
        }

        .dropdown-menu.show {
          max-height: 200px;
          padding: 5px 0;
        }

        .dropdown-item {
          margin: 0;
        }

        .dropdown-link {
          display: flex;
          align-items: center;
          padding: 15px 25px 15px 55px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
          font-size: 14px;
        }

        .dropdown-link:hover {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border-left-color: white;
        }

        .dropdown-link.active {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border-left-color: white;
        }

        .dropdown-icon {
          font-size: 16px;
          margin-right: 12px;
          width: 18px;
          text-align: center;
        }

        .dropdown-text {
          font-weight: 500;
        }

        /* Sidebar Footer */
        .sidebar-footer {
          padding: 25px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 18px 25px;
          background: linear-gradient(135deg, #dc3545 0%, #b02a37 100%);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 15px;
          font-weight: 600;
          box-shadow: 0 3px 12px rgba(220, 53, 69, 0.3);
        }

        .logout-btn:hover {
          background: linear-gradient(135deg, #b02a37 0%, #9c1e2a 100%);
          transform: translateY(-2px);
          box-shadow: 0 5px 18px rgba(220, 53, 69, 0.4);
        }

        /* Sidebar Overlay for Mobile */
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .sidebar-overlay.show {
          opacity: 1;
          visibility: visible;
        }

        /* Main Content Wrapper */
        .main-wrapper {
          flex: 1;
          margin-left: 260px;
          transition: all 0.3s ease;
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .main-wrapper.collapsed {
          margin-left: 0;
        }

        .add-project-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
          margin: 0;
          padding: 0;
          background: #ffffff;
          position: relative;
          overflow-x: hidden;
        }

        /* Desktop Menu Button */
        .desktop-menu-btn {
          display: flex;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          flex-direction: column;
          gap: 3px;
          padding: 10px;
          border-radius: 6px;
          transition: all 0.3s ease;
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }

        .desktop-menu-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-50%) scale(1.05);
        }

        .desktop-menu-btn .hamburger {
          width: 18px;
          height: 2px;
          background: white;
          transition: all 0.3s ease;
          border-radius: 1px;
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          flex-direction: column;
          gap: 3px;
          padding: 8px;
          margin-right: 15px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .mobile-menu-btn .hamburger {
          width: 20px;
          height: 2px;
          background: white;
          transition: all 0.3s ease;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          position: relative;
        }

        .main-content {
          flex: 1;
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

        @keyframes scaleIn {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
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

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out;
          animation-fill-mode: both;
        }

        /* Header Section */
        .header-section {
          background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
          padding: 25px 30px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(255, 0, 0, 0.2);
          position: relative;
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

        .nexgen-header {
          color: white;
          position: relative;
          z-index: 2;
          margin-bottom: 10px;
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

        .page-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .dashboard-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          backdrop-filter: blur(10px);
        }

        .dashboard-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .dashboard-icon {
          font-size: 14px;
        }

        .dashboard-text {
          font-size: 11px;
          font-weight: 600;
        }

        /* Form Section */
        .form-section {
          padding: 30px;
          background: #ffffff;
          min-height: calc(100vh - 200px);
        }

        .form-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .form-header {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 25px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #e9ecef;
          gap: 20px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 3px 12px rgba(108, 117, 125, 0.3);
        }

        .back-btn:hover {
          background: linear-gradient(135deg, #5a6268 0%, #495057 100%);
          transform: translateY(-2px);
          box-shadow: 0 5px 18px rgba(108, 117, 125, 0.4);
        }

        .back-icon {
          font-size: 16px;
          font-weight: bold;
        }

        .back-text {
          font-size: 12px;
          font-weight: 600;
        }

        .form-title {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .form-actions {
          display: flex;
          gap: 12px;
        }

        .btn-primary, .btn-secondary {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
          box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #cc0000 0%, #990000 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 0, 0, 0.4);
        }

        .btn-secondary:hover {
          background: #545b62;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(108, 117, 125, 0.4);
        }

        .btn-secondary.small, .btn-primary.small {
          padding: 8px 16px;
          font-size: 11px;
        }

        .form-content {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-section-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 25px;
          border: 1px solid #e9ecef;
          position: relative;
          overflow: hidden;
        }

        .form-section-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
        }

        .supervisor-section::before {
          background: linear-gradient(135deg, #ff6600 0%, #cc4400 100%);
        }

        .upload-section::before {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #dee2e6;
        }

        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: #333;
          margin: 0;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .section-badge {
          background: linear-gradient(135deg, #ff6600 0%, #cc4400 100%);
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .section-badge.csv {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-size: 12px;
          font-weight: 600;
          color: #495057;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input, .form-select, .form-textarea {
          padding: 12px 15px;
          border: 1px solid #ced4da;
          border-radius: 6px;
          font-size: 14px;
          color: #495057;
          background: white;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #ff0000;
          box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.1);
          background: #fff;
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 12px center;
          background-repeat: no-repeat;
          background-size: 16px;
          padding-right: 40px;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 5px;
        }

        .checkbox-group input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #ff0000;
        }

        .checkbox-label {
          font-size: 13px;
          color: #495057;
          cursor: pointer;
          user-select: none;
        }

        /* Supervisor Preview */
        .supervisor-preview {
          margin-top: 20px;
          background: white;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #dee2e6;
        }

        .preview-header {
          margin-bottom: 15px;
        }

        .preview-header h4 {
          font-size: 14px;
          font-weight: 700;
          color: #ff6600;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .preview-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }

        .preview-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f8f9fa;
        }

        .preview-item:last-child {
          border-bottom: none;
        }

        .preview-label {
          font-size: 12px;
          font-weight: 600;
          color: #6c757d;
          text-transform: uppercase;
        }

        .preview-value {
          font-size: 13px;
          font-weight: 500;
          color: #333;
        }

        /* File Upload Styles */
        .upload-area {
          margin-top: 15px;
        }

        .upload-zone {
          border: 2px dashed #dee2e6;
          border-radius: 12px;
          padding: 40px 20px;
          text-align: center;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .upload-zone.drag-over {
          border-color: #007bff;
          background: rgba(0, 123, 255, 0.05);
        }

        .upload-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .upload-icon {
          font-size: 48px;
          color: #6c757d;
        }

        .upload-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .upload-description {
          color: #6c757d;
          margin: 0;
          font-size: 14px;
        }

        .upload-btn {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
        }

        .upload-btn:hover {
          background: linear-gradient(135deg, #0056b3 0%, #004085 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
        }

        .upload-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .upload-info small {
          color: #6c757d;
          font-size: 12px;
        }

        /* File Preview */
        .file-preview {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(40, 167, 69, 0.1);
          border: 1px solid #28a745;
          border-radius: 8px;
          padding: 20px;
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .file-icon {
          font-size: 32px;
        }

        .file-details h4 {
          margin: 0 0 5px 0;
          font-size: 16px;
          color: #333;
        }

        .file-details p {
          margin: 0;
          font-size: 13px;
          color: #6c757d;
        }

        .file-actions {
          display: flex;
          gap: 10px;
        }

        /* CSV Preview */
        .csv-preview {
          margin-top: 20px;
          background: white;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #dee2e6;
        }

        .csv-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #dee2e6;
        }

        .csv-header h4 {
          font-size: 14px;
          font-weight: 700;
          color: #007bff;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .csv-count {
          background: #007bff;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }

        .csv-table-container {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }

        .csv-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .csv-table th {
          background: #f8f9fa;
          padding: 12px 8px;
          text-align: left;
          font-weight: 600;
          color: #495057;
          border-bottom: 1px solid #dee2e6;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.5px;
        }

        .csv-table td {
          padding: 10px 8px;
          border-bottom: 1px solid #f8f9fa;
          color: #333;
        }

        .csv-table tr:hover {
          background: rgba(0, 123, 255, 0.05);
        }

        /* Mobile Responsiveness */
        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar:not(.collapsed) {
            transform: translateX(0);
          }

          .main-wrapper {
            margin-left: 0;
          }

          .desktop-menu-btn {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .sidebar-toggle {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .nexgen-systems {
            font-size: 24px;
          }

          .systems-text {
            font-size: 16px;
          }

          .page-subtitle {
            flex-direction: column;
            gap: 10px;
          }

          .form-section {
            padding: 20px 15px;
          }

          .form-header {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }

          .header-left {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
          }

          .form-content {
            padding: 20px 15px;
          }

          .form-section-card {
            padding: 20px 15px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .preview-content {
            grid-template-columns: 1fr;
          }

          .file-preview {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }

          .file-actions {
            justify-content: stretch;
          }

          .file-actions .btn-secondary,
          .file-actions .btn-primary {
            flex: 1;
          }

          .upload-zone {
            padding: 30px 15px;
          }

          .csv-table-container {
            font-size: 12px;
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

          .form-title {
            font-size: 18px;
          }

          .form-section-card {
            padding: 15px;
          }

          .section-title {
            font-size: 14px;
          }

          .upload-zone {
            padding: 20px 10px;
          }

          .upload-title {
            font-size: 16px;
          }

          .upload-icon {
            font-size: 36px;
          }
        }

        /* Sidebar collapsed state for desktop */
        @media (min-width: 1025px) {
          .sidebar.collapsed {
            transform: translateX(-100%);
          }

          .main-wrapper.collapsed {
            margin-left: 0;
          }

          .desktop-menu-btn {
            display: flex;
          }

          .mobile-menu-btn {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AddNewProject;