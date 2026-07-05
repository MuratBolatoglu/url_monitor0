CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,

                       email VARCHAR(255) UNIQUE NOT NULL,

                       password_hash TEXT NOT NULL,

                       created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE monitors (
                          id BIGSERIAL PRIMARY KEY,

                          user_id BIGINT NOT NULL
                              REFERENCES users(id)
                                  ON DELETE CASCADE,

                          name VARCHAR(255) NOT NULL,

                          url TEXT NOT NULL,

                          status VARCHAR(20) DEFAULT 'PENDING',

                          interval_seconds INTEGER DEFAULT 60,

                          created_at TIMESTAMP DEFAULT NOW(),

                          last_checked_at TIMESTAMP
);

CREATE TABLE monitor_logs (
                              id BIGSERIAL PRIMARY KEY,

                              monitor_id BIGINT NOT NULL
                                  REFERENCES monitors(id)
                                      ON DELETE CASCADE,

                              status VARCHAR(20) NOT NULL,

                              status_code INTEGER,

                              response_time_ms INTEGER,

                              error_message TEXT,

                              checked_at TIMESTAMP DEFAULT NOW()
);