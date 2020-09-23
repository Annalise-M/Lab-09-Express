DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS logs;

CREATE TABLE recipes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT,
  directions TEXT[]
);

CREATE TABLE logs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  recipe_id BIGINT NOT NULL REFERENCES recipes(id),
  date_of_event TEXT,
  notes TEXT,
  rating INT
);
