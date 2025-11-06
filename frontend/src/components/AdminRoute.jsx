import { Navigate } from 'react-router-dom';
import { isAdmin } from '../services/AuthService';

export function AdminRoute({ children }) {
  if (!isAdmin()) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-danger text-center" role="alert">
              <h4 className="alert-heading">Access Denied</h4>
              <p>You do not have permission to access this page.</p>
              <p>Only administrators can view this content.</p>
              <hr />
              <p className="mb-0">Please contact support if you believe this is an error.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return children;
}
