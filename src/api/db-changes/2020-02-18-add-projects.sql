CREATE TABLE IF NOT EXISTS projects
(
    id          INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),

    UNIQUE (name)
);
CREATE TABLE IF NOT EXISTS usersXprojects
(
    id          INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id     bigint(20) unsigned NOT NULL,
    project_id  INT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (user_id)
        REFERENCES wp_users(id),
    FOREIGN KEY (project_id)
        REFERENCES projects(id),

    UNIQUE (user_id, project_id)
);