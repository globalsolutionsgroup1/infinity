import React, { useState, useEffect } from 'react';

const AddNewUser = () => {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
    department: '',
    assignedProjectId: '',
    priorityLevel: 'Standard',
    startDate: null,
    temporaryPassword: '',
    isActive: true
  });
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);
  const [forcePasswordReset, setForcePasswordReset] = useState(true);
  const [availableProjects, setAvailableProjects] = useState([]);

  useEffect(() => {
    loadAvailableProjects();
  }, []);

  const loadAvailableProjects = () => {
    setAvailableProjects([
      {
        id: '1',
        name: 'Klerksdorp EXT 12 Project',
        location: 'Klerksdorp',
        status: 'Active',
        completionPercentage: 45
      },
      {
        id: '2',
        name: 'Potchefstroom Housing Development',
        location: 'Potchefstroom',
        status: 'Planning',
        completionPercentage: 15
      },
      {
        id: '3',
        name: 'Welkom Industrial Complex',
        location: 'Welkom',
        status: 'Active',
        completionPercentage: 67
      },
      {
        id: '4',
        name: 'Bloemfontein Commercial Center',
        location: 'Bloemfontein',
        status: 'On Hold',
        completionPercentage: 23
      },
      {
        id: '5',
        name: 'Kimberley Residential Estate',
        location: 'Kimberley',
        status: 'Active',
        completionPercentage: 89
      }
    ]);
  };

  const handleRoleChange = (role) => {
    setNewUser(prev => ({
      ...prev,
      role,
      assignedProjectId: role !== 'Supervisor' ? '' : prev.assignedProjectId,
      priorityLevel: role !== 'Supervisor' ? 'Standard' : prev.priorityLevel
    }));
  };

  const goBack = () => {
    window.location.href = '/Dashboard';
  };

  const saveUser = () => {
    // Validation logic
    if (!newUser.firstName.trim() || !newUser.lastName.trim() || 
        !newUser.email.trim() || !newUser.role.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (newUser.role === 'Supervisor' && !newUser.assignedProjectId.trim()) {
      alert('Please assign a project for the supervisor');
      return;
    }

    // Save user logic here
    alert('User saved successfully!');
    window.location.href = '/Dashboard';
  };

  const cancel = () => {
    window.location.href = '/Dashboard';
  };

  const selectedProject = availableProjects.find(p => p.id === newUser.assignedProjectId);

  return (
    <div className="add-user-container">
      {/* Subtle Background Animation */}
      <div className="background-animation">
        <div className="floating-element elem-1"></div>
        <div className="floating-element elem-2"></div>
        <div className="floating-element elem-3"></div>
      </div>

      <div className="main-content">
        {/* Header Section */}
        <div className="header-section animate-slide-down">
          <div className="nexgen-header">
            <span className="nexgen-systems">NEXGEN</span>
            <span className="systems-text">SYSTEMS</span>
          </div>
          <div className="page-subtitle">
            <button className="dashboard-btn" onClick={goBack}>
              <span className="dashboard-icon">🏠</span>
              <span className="dashboard-text">BACK TO DASHBOARD</span>
            </button>
            ADD NEW USER
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
                <h2 className="form-title">USER INFORMATION</h2>
              </div>
              <div className="form-actions">
                <button className="btn-secondary" onClick={cancel}>CANCEL</button>
                <button className="btn-primary" onClick={saveUser}>SAVE USER</button>
              </div>
            </div>

            <div className="form-content">
              {/* Personal Information Section */}
              <div className="form-section-card animate-scale-in" style={{animationDelay: '0.2s'}}>
                <div className="section-header">
                  <h3 className="section-title">PERSONAL INFORMATION</h3>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">FIRST NAME *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={newUser.firstName}
                      onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                      placeholder="Enter first name" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">LAST NAME *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={newUser.lastName}
                      onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                      placeholder="Enter last name" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">EMAIL ADDRESS *</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="Enter email address" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">PHONE NUMBER</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      value={newUser.phoneNumber}
                      onChange={(e) => setNewUser({...newUser, phoneNumber: e.target.value})}
                      placeholder="Enter phone number" 
                    />
                  </div>
                </div>
              </div>

              {/* Role and Access Section */}
              <div className="form-section-card animate-scale-in" style={{animationDelay: '0.4s'}}>
                <div className="section-header">
                  <h3 className="section-title">ROLE & ACCESS</h3>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">USER ROLE *</label>
                    <select 
                      className="form-select" 
                      value={newUser.role}
                      onChange={(e) => handleRoleChange(e.target.value)}
                    >
                      <option value="">Select a role</option>
                      <option value="Admin">Administrator</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Worker">Worker</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">DEPARTMENT</label>
                    <select 
                      className="form-select" 
                      value={newUser.department}
                      onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                    >
                      <option value="">Select department</option>
                      <option value="Construction">Construction</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Quality Control">Quality Control</option>
                      <option value="Safety">Safety</option>
                      <option value="Management">Management</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Project Assignment Section (Only shown for Supervisors) */}
              {newUser.role === 'Supervisor' && (
                <div className="form-section-card supervisor-section animate-scale-in" style={{animationDelay: '0.6s'}}>
                  <div className="section-header">
                    <h3 className="section-title">PROJECT ASSIGNMENT</h3>
                    <div className="section-badge">SUPERVISOR</div>
                  </div>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">ASSIGN TO PROJECT *</label>
                      <select 
                        className="form-select" 
                        value={newUser.assignedProjectId}
                        onChange={(e) => setNewUser({...newUser, assignedProjectId: e.target.value})}
                      >
                        <option value="">Select a project to supervise</option>
                        {availableProjects.map(project => (
                          <option key={project.id} value={project.id}>
                            {project.name} - {project.location}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">START DATE</label>
                      <input 
                        type="date" 
                        className="form-input" 
                        value={newUser.startDate || ''}
                        onChange={(e) => setNewUser({...newUser, startDate: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">PRIORITY LEVEL</label>
                      <select 
                        className="form-select" 
                        value={newUser.priorityLevel}
                        onChange={(e) => setNewUser({...newUser, priorityLevel: e.target.value})}
                      >
                        <option value="Standard">Standard</option>
                        <option value="High">High Priority</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details Preview */}
                  {newUser.assignedProjectId && selectedProject && (
                    <div className="project-preview animate-fade-in-up">
                      <div className="preview-header">
                        <h4>PROJECT DETAILS</h4>
                      </div>
                      <div className="preview-content">
                        <div className="preview-item">
                          <span className="preview-label">Project Name:</span>
                          <span className="preview-value">{selectedProject.name}</span>
                        </div>
                        <div className="preview-item">
                          <span className="preview-label">Location:</span>
                          <span className="preview-value">{selectedProject.location}</span>
                        </div>
                        <div className="preview-item">
                          <span className="preview-label">Current Status:</span>
                          <span className={`preview-value status-${selectedProject.status.toLowerCase().replace(' ', '-')}`}>
                            {selectedProject.status}
                          </span>
                        </div>
                        <div className="preview-item">
                          <span className="preview-label">Progress:</span>
                          <span className="preview-value">{selectedProject.completionPercentage}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Additional Settings Section */}
              <div className="form-section-card animate-scale-in" style={{animationDelay: '0.8s'}}>
                <div className="section-header">
                  <h3 className="section-title">ACCOUNT SETTINGS</h3>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">TEMPORARY PASSWORD</label>
                    <input 
                      type="password" 
                      className="form-input" 
                      value={newUser.temporaryPassword}
                      onChange={(e) => setNewUser({...newUser, temporaryPassword: e.target.value})}
                      placeholder="Enter temporary password" 
                    />
                  </div>
                  <div className="form-group">
                    <div className="checkbox-group">
                      <input 
                        type="checkbox" 
                        id="sendEmail" 
                        checked={sendWelcomeEmail}
                        onChange={(e) => setSendWelcomeEmail(e.target.checked)}
                      />
                      <label htmlFor="sendEmail" className="checkbox-label">Send welcome email with login details</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="checkbox-group">
                      <input 
                        type="checkbox" 
                        id="forceReset" 
                        checked={forcePasswordReset}
                        onChange={(e) => setForcePasswordReset(e.target.checked)}
                      />
                      <label htmlFor="forceReset" className="checkbox-label">Force password reset on first login</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="checkbox-group">
                      <input 
                        type="checkbox" 
                        id="isActive" 
                        checked={newUser.isActive}
                        onChange={(e) => setNewUser({...newUser, isActive: e.target.checked})}
                      />
                      <label htmlFor="isActive" className="checkbox-label">Activate account immediately</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .add-user-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          position: relative;
          overflow-x: hidden;
        }

        /* Subtle Background Animation */
        .background-animation {
          position: fixed;
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
          animation: float 12s ease-in-out infinite;
        }

        .elem-1 { 
          width: 120px; 
          height: 120px; 
          top: 10%; 
          left: 5%; 
          animation-delay: 0s; 
        }
        
        .elem-2 { 
          width: 80px; 
          height: 80px; 
          top: 60%; 
          right: 8%; 
          animation-delay: -4s; 
        }
        
        .elem-3 { 
          width: 100px; 
          height: 100px; 
          bottom: 15%; 
          left: 20%; 
          animation-delay: -8s; 
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.4; 
          }
          50% { 
            transform: translateY(-25px) rotate(180deg); 
            opacity: 0.8; 
          }
        }

        .main-content {
          flex: 1;
          position: relative;
          z-index: 2;
        }

        /* Animations */
        @keyframes slideDown {
          0% { transform: translateY(-30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes fadeInUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes scaleIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
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
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
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

        .form-input, .form-select {
          padding: 12px 15px;
          border: 1px solid #ced4da;
          border-radius: 6px;
          font-size: 14px;
          color: #495057;
          background: white;
          transition: all 0.3s ease;
        }

        .form-input:focus, .form-select:focus {
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

        /* Project Preview */
        .project-preview {
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

        .status-active {
          color: #28a745;
          font-weight: 600;
        }

        .status-planning {
          color: #007bff;
          font-weight: 600;
        }

        .status-on-hold {
          color: #ffc107;
          font-weight: 600;
        }

        /* Mobile Responsiveness */
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
        }
      `}</style>
    </div>
  );
};

export default AddNewUser;