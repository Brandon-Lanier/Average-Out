-- Create a Database titled "average_out"



-- Create a table for users
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "firstname" VARCHAR(100) NOT NULL, 
    "lastname" VARCHAR(130) NOT NULL,
    "email" VARCHAR(200) NOT NULL
);


-- Create a table for assets
CREATE TABLE assets (
	"id" SERIAL PRIMARY KEY,
	"coin_id" VARCHAR(50) UNIQUE,
	"quantity" DECIMAL(20,4) DEFAULT 0,
	"user_id" INT REFERENCES "user" NOT NULL
);

-- Create an orders table
CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	coins text[],
	start_date DATE DEFAULT CURRENT_DATE,
	end_date DATE,
	daily_target DECIMAL(20,2) DEFAULT 0,
	total_target DECIMAl(20,2) DEFAULT 0,
	open BOOLEAN DEFAULT TRUE,
	user_id INT REFERENCES "user"
);

