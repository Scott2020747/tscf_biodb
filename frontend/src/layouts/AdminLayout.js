import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {

  return (

    <div className="admin-layout">

      <aside className="admin-sidebar">

        <h2>TSCF Admin</h2>

        <Link to="/admin/dashboard">
          Dashboard
        </Link>

        <Link to="/admin/members">
          Members
        </Link>

        <Link to="/admin/reports">
          Reports
        </Link>

        <Link to="/admin/settings">
          Settings
        </Link>

      </aside>

      <div className="admin-content">

        <Outlet />

      </div>

    </div>

  );
}
