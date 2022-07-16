
# Project model for develop api with FastAPI

This project is develop to help with the initial setup of a api used Python/FastAPI!



## Environment Variables

To run this project, copy file .env_example rename for .env and inclui your datas

`POSTGRES_HOST`

`POSTGRES_DB`

`POSTGRES_USER`

`POSTGRES_PASSWORD`

`POSTGRES_PORT`

`DB_DRIVER`



## Run Local

Clone the projec

```bash
  git clone https://github.com/Caiocof/backend_fast_model.git
```

Enter the project dir

```bash
  cd backend_fast_model
```

Create your virtual environment

It's recommended that you create a virtual enviroment. To do this, 
you can use the [virtualenv](https://docs.python.org/pt-br/3/library/venv.html). 
In the root folder of the project, type the follow command (Just type once):
```
python3 -m venv venv
```

- On linux:
     ```
     source venv/bin/activate
     ```  
  
- On Windows:
     ```
     ./venv/Script/activate.bat
     ```


Install all dependencies

```bash
  pip install -r requirements.txt
```

Start Projec

```bash
  make db_revision message=initial
```
```bash
  make db_create
```
```bash
  make ev_server 
```


## Stacks
**DataBase:** Postgres

**Back-end:** Python, FastAPI, SQLAlchemy, Alembic

**Deploy:** Docker


## Autores

- [@caiocof](https://www.github.com/caiocof)
- [@IgorGarciaPereira](https://www.github.com/IgorGarciaPereira)

