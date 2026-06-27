import React, { useState } from "react";

const Settings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div>

      <h1 className="text-2xl font-bold text-green-800 mb-4">
        System Settings
      </h1>

      {/* ========================= */}
      {/* SETTINGS PANEL */}
      {/* ========================= */}
      <div className="bg-white p-6 shadow space-y-4">

        <div>
          <h2 className="font-bold">Notifications</h2>

          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
            />
            Enable Email Notifications
          </label>

          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={smsNotif}
              onChange={() => setSmsNotif(!smsNotif)}
            />
            Enable SMS Notifications
          </label>
        </div>

        {/* ========================= */}
        {/* SYSTEM INFO */}
        {/* ========================= */}
        <div>
          <h2 className="font-bold mt-4">System Info</h2>

          <p className="text-sm text-gray-600 mt-2">
            TSCF Vision Partners v1.0.0
          </p>

          <p className="text-sm text-gray-600">
            PERN Stack (PostgreSQL, Express, React, Node.js)
          </p>
        </div>

      </div>

    </div>
  );
};

export default Settings;
