CREATE DATABASE chat_app_db;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    full_name TEXT,
    username TEXT NOT null,
    password TEXT NOT NULL,
    date TEXT
);

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    from_user TEXT,
    to_user TEXT,
    message TEXT,
    date TEXT
);

CREATE TABLE deleted_messages(
    id SERIAL PRIMARY KEY,
    deleted_user_id BIGINT NOT NULL,
    deleted_message TEXT NOT NULL,
    date TEXT NOT NULL
);