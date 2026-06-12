-- TSCF Vision Partners Database Schema

CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    surname VARCHAR(100) NOT NULL,
    given_name VARCHAR(100) NOT NULL,
    institution VARCHAR(200),
    dob DATE,
    sex VARCHAR(10),
    marital_status VARCHAR(20),
    home_province VARCHAR(100),
    country VARCHAR(100),
    denomination VARCHAR(100),
    address TEXT,
    phone VARCHAR(50),
    mobile VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    college_university VARCHAR(200),
    member_role VARCHAR(50),
    leader_position VARCHAR(100),
    year_of_graduation INTEGER,
    field_of_study VARCHAR(200),
    graduate_program VARCHAR(100),
    fortnightly_amount DECIMAL(10,2),
    monthly_amount DECIMAL(10,2),
    yearly_amount DECIMAL(10,2),
    donation_amount DECIMAL(10,2),
    membership_type VARCHAR(50),
    membership_amount DECIMAL(10,2),
    membership_new_renewal VARCHAR(20),
    membership_number VARCHAR(50),
    application_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_status ON members(application_status);

-- Optional: Insert a test record (uncomment if needed)
-- INSERT INTO members (surname, given_name, email) VALUES ('Test', 'User', 'test@example.com') ON CONFLICT (email) DO NOTHING;
